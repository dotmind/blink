import { URL_KEY_IDENTIFIER } from "@/app/constants/navigator";

export function toShareUrl(id: string, jwk: string){
  return `${window.location.origin}/${id}${URL_KEY_IDENTIFIER}${jwk}`;
}

export async function extractJwkFromUrl(): Promise<string> {
  const key = window.location.hash.replace(URL_KEY_IDENTIFIER, "");

  if(!key){
    throw new Error("No key found in url");
  }

  return key;
}