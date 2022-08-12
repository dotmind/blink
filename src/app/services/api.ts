import { API_URL, API_VERSION } from '@/app/constants/api';
import { signRequest } from '@/app/services/crypto';

const endpoint = (path: string): string => `${API_URL}/files/${path}`;

export async function uploadFile(fingerprint: string, file: ArrayBuffer, filename: string): Promise<string> {
  const path = '/upload';
  const { signature, timestamp } = await signRequest('POST', path, fingerprint, API_VERSION);

  const headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('signature', signature);
  headers.append('timestamp', timestamp);
  headers.append('fingerprint', fingerprint);

  headers.append('filename', filename);

  const request = await fetch(endpoint(path), {
    method: 'POST',
    headers,
    body: file,
  });

  const { success, data } = await request.json();
  if (!success) {
    throw new Error('Upload failed');
  }

  return data.id;
}

export async function receiveFile(id: string): Promise<{
  file: { type: string; data: ArrayBuffer };
  filename: string;
}> {
  const path = `/preview/${id}`;
  const headers = new Headers();

  const response = await fetch(endpoint(path), {
    method: 'GET',
    headers,
  }).then((res) => res.json());

  if (response.status === 404) {
    throw new Error('Receive failed');
  }

  return response.data;
}
