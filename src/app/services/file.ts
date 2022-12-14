import { FILE_TYPE, FILE_MAX_SIZE } from '@/app/constants/file';

export async function fileToBase64(file: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export async function base64ToFile(data: string, filename: string): Promise<Blob> {
  const response = await fetch(data);
  const blob = await response.blob();

  return new File([blob], filename, { type: blob.type });
}

export function isFileValid(file: File): boolean {
  if (!window.FileReader) {
    throw new Error('FileReader is not supported in this browser');
  }

  return FILE_TYPE.includes(file?.type);
}

export function isFileSizeValid(file: File): boolean {
  return file.size <= FILE_MAX_SIZE;
}

export function extractFilePath(url: string = window.location.href): string {
  const path = url.split('/').slice(3).join('/').split('#')[0];
  return path;
}
