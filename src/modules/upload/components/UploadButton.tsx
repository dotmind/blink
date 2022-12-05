import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadStatus, useUpload } from '@/modules/upload/providers/UploadProvider';
import { useModal } from '@/app/providers/ModalProvider';
import { useApp } from '@/app/providers/AppProdiver';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';
import { uploadFile } from '@/app/services/api';
import { toShareUrl, canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Button, { ButtonStyle } from '@/app/components/Button';
import uploadIcon from '@/app/assets/svg/upload.svg';
import { copyRichText } from '@/app/utils/clipboard';

function UploadButton(): JSX.Element | null {
  const { fingerprint } = useApp();
  const { open: openErrorModal } = useModal();
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

      if (filename) {
        if (canUseNativeShare()) {
          nativeShare(url, filename);
        } else {
          copyRichText({ fileName: filename, link: url });
        }
      }
    } catch (error) {
      setError(error as Error);
      openErrorModal();
      setStatus(UploadStatus.ERROR);
    }
  }, [file, setStatus, setShareUrl, fingerprint, canUpload]);

  const renderButton = useMemo((): JSX.Element | null => {
    if (!file) {
      return null;
    }

    return (
      <Button type={'submit'} style={ButtonStyle.GRADIENT} callback={handleUpload} name={t('upload.button')}>
        {t('upload.button')} <img src={uploadIcon} alt={'upload svg icon'} />
      </Button>
    );
  }, [file, handleUpload, t]);

  return renderButton;
}

export default UploadButton;
