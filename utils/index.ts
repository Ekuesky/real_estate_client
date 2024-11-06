import initiateSocialAuth from "@/utils/initiateSocialAuth"
export {default as extractErrorMessage} from '@/utils/extractErrorMessage';
export {default as PersistAuth} from '@/utils/PersistAuth';

export const useGoogle = () => initiateSocialAuth("google-oauth2", "google");