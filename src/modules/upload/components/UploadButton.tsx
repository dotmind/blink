import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

import { UploadStatus, useUpload } from '@/modules/upload/providers/UploadProvider';
import { useApp } from '@/app/providers/AppProdiver';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';
import { uploadFile } from '@/app/services/api';
import { toShareUrl, canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Button, { ButtonStyle } from '@/app/components/Button';

function UploadButton(): JSX.Element {
  const { fingerprint } = useApp();
  const { file, setStatus, setShareUrl, filename, setError, addToHistory } = useUpload();
  const { t } = useTranslation();
  const canUpload: boolean = useMemo(() => !!(fingerprint && file && filename), [fingerprint, file, filename]);

  const handleUpload: () => Promise<void> = useCallback(async () => {
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

      setStatus(UploadStatus.SUCCESS);

      await navigator.clipboard.writeText(url);
      if (canUseNativeShare()) {
        await nativeShare(url);
      }
    } catch (error) {
      setError(error as Error);
      setStatus(UploadStatus.ERROR);
    }
  }, [file, setStatus, setShareUrl, fingerprint, canUpload]);

  return (
    <Button style={ButtonStyle.PRIMARY} callback={handleUpload} disabled={!canUpload} name={t('upload.button')}>
      {t('upload.button')} <FontAwesomeIcon icon={faCloudUpload} />
    </Button>
  );
}

export default UploadButton;
