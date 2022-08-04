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

export async function base64IsPdf(data: string): Promise<boolean> {
  const response = await fetch(data);
  const blob = await response.blob();
  return blob.type === 'application/pdf';
}