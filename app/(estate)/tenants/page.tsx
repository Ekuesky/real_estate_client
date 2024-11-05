"use client";
import React from "react";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";

export default function TenantsPage(){
	const {data, isLoading, isSuccess, isError, Error} = useGetAllUsersQuery({

	})
if (isLoading) {
	return (
		<div className="flex-center pt-32">
			<Spinner size="lg"/>
		</div>
	)
	}
	return (
		<div>
			<h1 className="dark:text-pumpkin text-6xl">Tenants </h1>
			{data && data.profiles.results.length > 0 ? (data.profiles.results.map(tenant =>(
				<div key={tenant.id}>
          <h2>{tenant.first_name} {tenant.last_name}</h2>
          <p>{tenant.gender}</p>
          <p>{tenant.occupation}</p>
        </div>
			))): ( <p> No tenant found	</p>)
			}
		</div>
	)
}