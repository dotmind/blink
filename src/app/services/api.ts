import { API_URL, API_VERSION } from '@/app/constants/api';
import { signRequest } from '@/app/services/crypto';

const endpoint = (path: string): string => `${API_URL}/files/${path}/`;

export async function uploadFile(fingerprint: string, file: ArrayBuffer, filename: string): Promise<string> {
  const path = 'upload';
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
  }).catch(() => {
    throw new Error('common.errors.network');
  });

  const { data, success } = await request.json();

  if (!success) {
    throw new Error(data.message);
  }

  return data.id;
}

export async function receiveFile(
  fingerprint: string,
  id: string,
): Promise<{
  file: { type: string; data: ArrayBuffer };
  filename: string;
  expireAt: string;
}> {
  const path = `preview/${id}`;
  const { signature, timestamp } = await signRequest('GET', path, fingerprint, API_VERSION);

  const headers = new Headers();
  headers.append('fingerprint', fingerprint);
  headers.append('timestamp', timestamp);
  headers.append('signature', signature);

  const request = await fetch(endpoint(path), {
    method: 'GET',
    headers,
  }).catch(() => {
    throw new Error('common.errors.network');
  });

  const { data, success } = await request.json();

  if (!success) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteFile(fingerprint: string, id: string): Promise<string> {
  const path = `delete/${id}`;
  const { signature, timestamp } = await signRequest('DELETE', path, fingerprint, API_VERSION);

  const headers = new Headers();
  headers.append('fingerprint', fingerprint);
  headers.append('timestamp', timestamp);
  headers.append('signature', signature);

  const response = await fetch(endpoint(path), {
    method: 'DELETE',
    headers,
  }).then((res) => res.json());

  if (response.status === 404) {
    throw new Error('Delete failed');
  }

  return response.data;
}
