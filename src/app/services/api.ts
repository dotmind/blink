import { API_URL } from '@/app/constants/api';
import { signHMACSha256 } from '@/app/services/crypto';

const endpoint = (path: string): string => `${API_URL}${path}`;

const signRequest = async (
  method: string,
  endpoint: string,
  fingerprint: string,
): Promise<{ signature: string; timestamp: string }> => {
  const timestamp = Date.now().toString();
  const signature = await signHMACSha256(`${method}:${endpoint}:${timestamp}:${fingerprint}`);

  return { signature, timestamp };
};

export async function uploadFile(fingerprint: string, file: ArrayBuffer): Promise<string> {
  // @TODO: Wait API dev to check if path is correct
  const path = '/files/upload';
  const { signature, timestamp } = await signRequest('POST', path, fingerprint);

  const headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('signature', signature);
  headers.append('timestamp', timestamp);
  headers.append('fingerprint', fingerprint);

  const request = await fetch(endpoint(path), {
    method: 'POST',
    headers: headers,
    body: file,
  });

  const { success, data } = (await request.json()) as any;
  if (!success) {
    throw new Error('Upload failed');
  }

  return data.id;
}


// @TODO: download function
// export async function downloadfile(id: string): Promise<ArrayBuffer> {
//   // @TODO: Wait API dev to check if path is correct
//   const path = `/files/download/${id}`;

// }