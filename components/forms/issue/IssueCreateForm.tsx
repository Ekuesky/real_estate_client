"use client";
import React from "react";
import { useAddIssueMutation } from "@/lib/redux/features/issues/issueApi";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ApartmentSelector from "@/components/forms/issue/ApartmentSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrioritySelector from "@/components/forms/issue/PrioritySelector";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { TIssueCreateSchema, IssueCreateSchema } from "@/lib/validationSchemas";

function IssueCreateForm() {
 const [addIssue, {isLoading, isError, error}] = useAddIssueMutation()
 const router = useRouter()

 if (isLoading){
  return <div> <Spinner size="lg" /> </div>
 }

 if (isError) {
   return <div>Error: {error?.message || "An error occurred"}</div>
 }

 const form = useForm<TIssueCreateSchema>({
  resolver: zodResolver(IssueCreateSchema),
  mode: "all"
 })

 const onSubmit = async (values: TIssueCreateSchema) => {
  try {
   const apartmentId = values.apartmentId;
   const {apartmentId: _, ...formData} = values

   await addIssue({
    apartment_id: apartmentId,
    ...formData
   }).unwrap()
    // show full url to console
    console.log(apartmentId)
   form.reset()
   toast.success("Issue reported successfully")
   router.push("/profile")
  } catch (error) {
   const errorMsg = extractErrorMessage(error)
   toast.error(errorMsg || "Error when trying to save issue")
  }
 }

 return (
  <div className="container mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ApartmentSelector form={form} />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Issue Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Issue Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PrioritySelector form={form} />

          <Button className="lime-gradient text-baby_ballon"
            type="submit"
          >
           Create
          </Button>
        </form>
      </Form>
    </div>
 );
}

export default IssueCreateForm;