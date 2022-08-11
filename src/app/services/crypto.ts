export async function generateKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 128,
    },
    true,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptWithKey(key: CryptoKey, payload: string) {
  return window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    new TextEncoder().encode(payload),
  );
}

export async function decryptWithKey(key: CryptoKey, buffer: ArrayBuffer): Promise<string> {
  const plainBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    buffer,
  );

  return new TextDecoder().decode(new Uint8Array(plainBuffer));
}

export async function exportKey(key: CryptoKey) {
  const { k: jwk } = await window.crypto.subtle.exportKey('jwk', key);

  return jwk;
}

export async function importKey(jwk: string) {
  return window.crypto.subtle.importKey(
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
}

/**
 * @XXX WIP
 * Signature
 */

async function _buf2hex(buffer: ArrayBuffer): Promise<string> {
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => ('00' + x.toString(16)).slice(-2)).join('');
}

export async function signHMACSha256(str: string): Promise<string> {
  const cryptoKey = await window.crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    ['sign'],
  );

  const buffer = new TextEncoder().encode(str);
  const keyBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, buffer);

  return _buf2hex(keyBuffer);
}
