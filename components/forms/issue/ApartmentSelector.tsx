'use client'

import { useGetMyApartmentsQuery } from '@/lib/redux/features/apartments/apartApi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import Spinner from "@/components/shared/Spinner";

type ApartmentSelectorProps = {
  form: UseFormReturn<any>
}

export default function ApartmentSelector({ form }: ApartmentSelectorProps) {
  const { data , isLoading, isError, error} = useGetMyApartmentsQuery()

  if (isLoading) {
    return <Spinner size="lg"/>
  }

  if (isError) {
    return <div> An error occurred when trying to retrieve data</div>
  }

  return (
    <FormField
      control={form.control}
      name="apartmentId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Apartment</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Choose your apartment" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.apartments?.results.map((apartment) => (
                <SelectItem key={apartment.id} value={apartment.id.toString()}>
                  {`Unit-number: ${apartment.unit_number} - Building: ${apartment.building} - Floor: ${apartment.floor}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

