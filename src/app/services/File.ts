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
  const validFileTypes = ['application/pdf'];
  const fileType = file.type;

  if (!validFileTypes.includes(fileType)) {
    return false;
  }

  return true;
}
