import { CRYPTO_SECRET } from '@/app/constants/api';

export async function generateKey(): Promise<CryptoKey> {
  try {
    return await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 128,
      },
      true,
      ['encrypt', 'decrypt'],
    );
  } catch (e) {
    throw new Error('common.errors.https');
  }
}

export async function encryptWithKey(key: CryptoKey, payload: string) {
  try {
    return await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
      },
      key,
      new TextEncoder().encode(payload),
    );
  } catch (e) {
    throw new Error('common.errors.https');
  }
}

export async function decryptWithKey(key: CryptoKey, buffer: ArrayBuffer): Promise<string> {
  try {
    const plainBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
      },
      key,
      buffer,
    );

    return new TextDecoder().decode(new Uint8Array(plainBuffer));
  } catch (e) {
    throw new Error('common.errors.cannot_decrypt');
  }
}

export async function exportKey(key: CryptoKey): Promise<string> {
  try {
    const { k: jwk } = await window.crypto.subtle.exportKey('jwk', key);

    if (!jwk) {
      throw new Error('common.errors.jwk_export');
    }

    return jwk;
  } catch (e) {
    throw new Error('common.errors.https');
  }
}

export async function importKey(jwk: string) {
  try {
    return await window.crypto.subtle.importKey(
      'jwk',
      {
        k: jwk,
        alg: 'A128GCM',
        ext: true,
        key_ops: ['encrypt', 'decrypt'],
        kty: 'oct',
      },
      {
        name: 'AES-GCM',
        length: 128,
      },
      false,
      ['decrypt'],
    );
  } catch (e) {
    throw new Error('common.errors.https');
  }
}

export async function _buf2hex(buffer: ArrayBuffer): Promise<string> {
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => `00${x.toString(16)}`.slice(-2)).join('');
}

export async function signHMACSha256(str: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(CRYPTO_SECRET),
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['sign'],
    );
    const buffer = encoder.encode(str);
    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, buffer);

    return await _buf2hex(signature);
  } catch (e) {
    throw new Error('common.errors.https');
  }
}

export async function signRequest(
  method: string,
  endpoint: string,
  fingerprint: string,
  version: string,
): Promise<{ signature: string; timestamp: string }> {
  const timestamp = Date.now().toString();
  const signature = await signHMACSha256(`${version}:${method}:${endpoint}:${timestamp}:${fingerprint}`);

  return { signature, timestamp };
}
