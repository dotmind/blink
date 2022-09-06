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

export function canUseNativeShare() {
  return !!navigator.share;
}

export function nativeShare(url: string) {
  if (!canUseNativeShare()) {
    throw new Error('Native share not supported');
  }

  return navigator.share({
    title: 'noshit',
    text: 'Noshit - Share your PDF safely 🔐',
    url,
  });
}

async function isChildWindow(): Promise<boolean> {
  const { opener } = window;
  if (opener) {
    throw new Error('Parent window detected');
  }

  return false;
}

async function isFacebookApp(): Promise<boolean> {
  const ua = navigator.userAgent || navigator.vendor;
  const fbAgent = ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1 || ua.indexOf('Instagram') > -1;

  if (fbAgent) {
    throw new Error('Facebook agent detected');
  }

  return false;
}

async function isIframe(): Promise<boolean> {
  const frameEl = window.frameElement;
  if (frameEl) {
    throw new Error('Iframe detected');
  }

  return false;
}

export async function isInInsecureContext(): Promise<void> {
  try {
    await Promise.all([isFacebookApp(), isChildWindow(), isIframe()]);
  } catch (e) {
    throw new Error('Insecure context. Please use your favorite browser instead.');
  }
}

export function sanitizeName(name: string) {
  const sanitizedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return sanitizedName.replace(/\s/g, '_');
}

export function prepareFileName(filename: string) {
  const [name, extension] = filename.split('.');
  return `${name}_noshit_${Date.now()}.${extension}`;
}
