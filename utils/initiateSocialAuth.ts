import { toast} from "react-toastify";

interface SocialAuth {
	authorization_url: string;
}

export default async function InitiateSocialAuth(provider: string, redirect:string){

try {
	const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/o/$
	{provider}/?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/${redirect}`;
	const response = await fetch(url, {
		method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
		credentials: "include",
	});
	const data: SocialAuth = await response.json();
	if (response.status === 200 && typeof window !== "undefined" ){
		window.location.replace(data.authorization_url)
	}else {
		toast.error("Failed to initiate social authentication. Please try again.");
	}

}
	catch (e){
	console.error(e);
	toast.error("Failed to initiate social authentication. Please try again.");
	}
}