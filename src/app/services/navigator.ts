import { URL_KEY_IDENTIFIER, FILE_IDENTIFIER } from '@/app/constants/navigator';

export function toShareUrl(id: string, jwk: string) {
  return `${window.location.origin}/${id}${URL_KEY_IDENTIFIER}${jwk}`;
}

export async function extractJwkFromUrl(url?: string): Promise<string> {
  const hash = url ? new URL(url).hash : window.location.hash;
  const key = hash.replace(URL_KEY_IDENTIFIER, '')

  if (!key) {
    throw new Error('No key found in url');
  }

  return key;
}

export function canUseNativeShare() {
  return !!navigator.share;
}

export function nativeShare(url: string, filename: string) {
  if (!canUseNativeShare()) {
    throw new Error('Native share not supported');
  }

  return navigator
    .share({
      title: 'blink',
      text: filename,
      url,
    })
    .catch(() => {
      // Ignore error if user cancels any native share
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
  const name = filename.replace(/\.pdf$/i, '');
  return `${name}_${FILE_IDENTIFIER}_${Date.now()}.pdf`;
}

export function getFileWeight(file: string): number {
  // prettier-ignore
  // eslint-disable-next-line no-nested-ternary
  const padding: 0 | 1 | 2 = file.endsWith('==') ? 2 : (file.endsWith('=') ? 1 : 0);
  const fileWeight: number = 3 * (file.length / 4) - padding;
  return Math.round(fileWeight / 1024); // in KB
}
