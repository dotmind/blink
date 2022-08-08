import { useCallback } from 'react';

import { UploadStatus, useUpload } from '@/app/providers/UploadProvider';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';

const UploadButton = () => {
  const { file, status, setStatus, setShareUrl, fingerprint } = useUpload();

  const handleUpload = useCallback(async () => {
    setStatus(UploadStatus.UPLOADING);

    try {
      if(!fingerprint || !file) {
        throw new Error('Fingerprint or file is missing');
      }

      const cryptoKey = await generateKey();
      const cryptedPayload = await encryptWithKey(cryptoKey, file as string);
      const keyString = await exportKey(cryptoKey);

      // TODO: send to server and get id back to generate url

      setStatus(UploadStatus.SUCCESS);
    } catch (error) {
      setStatus(UploadStatus.ERROR);
    }
  }, [file, status, setStatus, setShareUrl]);

  return <button onClick={handleUpload}>Upload</button>;
};

export default UploadButton;
