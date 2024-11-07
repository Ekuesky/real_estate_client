import { toast} from "react-toastify";

interface SocialAuth {
	authorization_url: string;
}
/* Cette fonction permet d'initier une authentification sociale
(par exemple, avec Google, Facebook, etc.)
 */
export default async function initiateSocialAuth(provider: string, redirect:string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/o/${provider}/?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/auth/${redirect}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });
    /* Récupérer les données de réponse, qui doivent inclure l'URL d'autorisation*/
    const data: SocialAuth = await response.json();

    /* Si la réponse a un statut 200 (OK) et que nous sommes dans un environnement navigateur */
    if (response.status === 200 && typeof window !== "undefined") {
      /* Rediriger l'utilisateur vers l'URL d'autorisation pour terminer l'authentification */
      window.location.replace(data.authorization_url);
    } else {
      toast.error("Failed to initiate social authentication. Please try again.");
    }
  } catch (e) {
    console.error(e);
    toast.error("Failed to initiate social authentication. Please try again.");
  }
}