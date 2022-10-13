import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UploadStatus, useUpload } from '@/modules/upload/providers/UploadProvider';
import { useApp } from '@/app/providers/AppProdiver';
import { generateKey, encryptWithKey, exportKey } from '@/app/services/crypto';
import { uploadFile } from '@/app/services/api';
import { toShareUrl, canUseNativeShare, nativeShare } from '@/app/services/navigator';
import { ButtonStyle } from '@/app/components/Button';
import crossIcon from '@/app/assets/svg/cross.svg';

import styles from '@/modules/upload/components/UploadButton/styles.module.scss';

interface IProps {
  input: HTMLInputElement | null;
  isValid: boolean;
}

function UploadButton({ input, isValid }: IProps): JSX.Element {
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

      if (canUseNativeShare()) {
        nativeShare(url);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
      }
    } catch (error) {
      setError(error as Error);
      setStatus(UploadStatus.ERROR);
    }
  }, [file, setStatus, setShareUrl, fingerprint, canUpload]);

  const openFile = useCallback(() => {
    if (input) {
      input.click();
    }
  }, [input]);

  const renderButton = useMemo(
    (): JSX.Element => (
      <button
        className={`${styles[ButtonStyle.PRIMARY]} ${styles.morphButton}`}
        type={'submit'}
        name={t('upload.button')}
        onClick={file ? handleUpload : openFile}
        // eslint-disable-next-line no-nested-ternary
        data-status={!file ? (isValid ? 'idle' : 'error') : 'valid'}>
        <p className={styles.text}>{t('upload.button')}</p>
        <img className={styles.icon} src={crossIcon} alt={'Morph button icon'} />
      </button>
    ),
    [file, isValid, handleUpload, openFile],
  );

  return renderButton;
}

export default UploadButton;
