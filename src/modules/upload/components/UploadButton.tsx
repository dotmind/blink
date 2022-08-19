import { useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

import { UploadStatus, useUpload } from '@/modules/upload/providers/UploadProvider';
import { useApp } from '@/app/providers/AppProdiver';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';
import { uploadFile } from '@/app/services/api';
import { toShareUrl } from '@/app/services/navigator';
import useHistory from '@/app/hooks/useHistory';
import Button, { ButtonStyle } from '@/app/components/Button';

function UploadButton() {
  const { fingerprint } = useApp();
  const { file, setStatus, setShareUrl, filename } = useUpload();
  const { addToHistory } = useHistory();
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

      addToHistory({ filename: filename as string, url });

      setShareUrl(url);
      // @TODO: Re enable when UI ready
      // setStatus(UploadStatus.SUCCESS);
      // status UI debug controls :
      document.addEventListener('keydown', (e) => {
        if (e.key === 'p') {
          setStatus(UploadStatus.SUCCESS);
        }
        if (e.key === 'o') {
          setStatus(UploadStatus.UPLOADING);
        }
      });
    } catch (error) {
      setStatus(UploadStatus.ERROR);
    }
  }, [file, setStatus, setShareUrl, fingerprint, canUpload]);

  return (
    <Button style={ButtonStyle.PRIMARY} callback={handleUpload} disabled={!canUpload}>
      Uploader un fichier <FontAwesomeIcon icon={faCloudUpload} />
    </Button>
  );
}

export default UploadButton;
