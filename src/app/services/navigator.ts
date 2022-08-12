import { URL_KEY_IDENTIFIER } from '@/app/constants/navigator';

export function toShareUrl(id: string, jwk: string) {
  return `${window.location.origin}/${id}${URL_KEY_IDENTIFIER}${jwk}`;
}

export async function extractJwkFromUrl(): Promise<string> {
  const key = window.location.hash.replace(URL_KEY_IDENTIFIER, '');

  if (!key) {
    throw new Error('No key found in url');
  }

  return key;
}

export function slugify(str: string): string {
  const index = str.lastIndexOf('.');
  const extension = index > 0 ? str.slice(index) : '';
  let name = index > 0 ? str.slice(0, index) : str;

  name = name.replace(/^\s+|\s+$/g, '');
  name = name.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc______';
  for (let i = 0, l = from.length; i < l; i+=1) {
    name = name.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  name = name
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_');

  return name + extension;
}
