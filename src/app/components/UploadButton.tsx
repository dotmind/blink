import { useCallback, useMemo } from 'react';

import { UploadStatus, useUpload } from '@/app/providers/UploadProvider';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';
import { uploadFile } from '@/app/services/api';
import { toShareUrl } from '@/app/services/navigator';

function UploadButton() {
  const { file, status, setStatus, setShareUrl, fingerprint, filename } = useUpload();
  const canUpload = useMemo(() => !!(fingerprint && file && filename), [fingerprint, file, filename]);

  const handleUpload = useCallback(async () => {
    setStatus(UploadStatus.UPLOADING);

    try {
      if (!canUpload) {
        throw new Error('Fingerprint or file is missing');
      }

      const cryptoKey = await generateKey();
      const cryptedPayload = await encryptWithKey(cryptoKey, file as string);
      const jwk = await exportKey(cryptoKey);

      const id = await uploadFile(fingerprint, cryptedPayload, filename as string);
      const url = toShareUrl(id, jwk);

      setShareUrl(url);
      setStatus(UploadStatus.SUCCESS);
    } catch (error) {
      setStatus(UploadStatus.ERROR);
    }
  }, [file, status, setStatus, setShareUrl, fingerprint, canUpload]);

  return (
    <button type={'button'} onClick={handleUpload}>
      Upload
    </button>
  );
}

export default UploadButton;
