import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { fileToBase64, isFileValid } from '@/app/services/file';
import UploadButton from '@/modules/upload/components/UploadButton';
import Notification, { NotificationType } from '@/app/components/Notification';
import pdf_icons from '@/app/assets/svg/pdf_icon.svg';
import { sanitizeName } from '@/app/services/navigator';

import styles from '@/modules/upload/components/FileInput/styles.module.scss';

function FileInput() {
  const [error, setError] = useState<string | null>(null);
  const { file, setFile, filename, setFilename, setIsDragActive } = useUpload();
  const fileHandler = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const onFileChange = useCallback(async () => {
    if (!fileHandler.current || !fileHandler.current.files) {
      setError(t('upload.file_not_found'));
      return;
    }

    const inputFile = fileHandler.current.files[0];

    if (!isFileValid(inputFile)) {
      setFile(undefined);
      setFilename(undefined);
      setError(t('upload.errors.wrong_file_type'));
      return;
    }

    const base64 = await fileToBase64(inputFile);
    const { name } = inputFile;

    setError(null);
    setFilename(sanitizeName(name));
    setFile(base64 as ArrayBuffer);
  }, [file, fileHandler, setFile, setFilename]);

  const cancelEvent = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleIsActive = useCallback(
    (active: boolean) => (event: DragEvent) => {
      cancelEvent(event);
      setIsDragActive(active);
    },
    [],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      if (!fileHandler.current) {
        return;
      }

      cancelEvent(e);
      fileHandler.current.files = e.dataTransfer?.files || null;
      onFileChange();
      handleIsActive(false)(e);
    },
    [file],
  );

  useEffect(() => {
    if (!fileHandler.current) {
      return () => {};
    }

    fileHandler.current.addEventListener('change', onFileChange);
    window.addEventListener('dragover', handleIsActive(true));
    window.addEventListener('dragleave', handleIsActive(false));
    window.addEventListener('dragenter', cancelEvent);
    window.addEventListener('drop', handleDrop);

    return () => {
      if (fileHandler.current) {
        fileHandler.current.removeEventListener('change', onFileChange);
      }
      window.removeEventListener('dragover', handleIsActive(true));
      window.removeEventListener('dragleave', handleIsActive(false));
      window.removeEventListener('dragenter', cancelEvent);
      window.removeEventListener('drop', handleDrop);
    };
  }, [file, fileHandler]);

  return (
    <>
      <form className={styles.fileInput_container}>
        {/* eslint-disable-next-line */}
        <div className={styles.fileInput_icons} onClick={() => fileHandler.current?.click()}>
          <img src={pdf_icons} alt={'pdf icon'} height={'100%'} width={'100%'} />
        </div>

        <p>{t('upload.input')}</p>

        <input id={'fileLoader'} type={'file'} accept={'application/pdf'} className={styles.fileInput} ref={fileHandler} />
      </form>

      <div className={styles.fileInput_controls}>
        <UploadButton />
        {file && <Notification type={NotificationType.SUCCESS}>{filename}</Notification>}
        {error && <Notification type={NotificationType.ERROR}>{error}</Notification>}
      </div>
    </>
  );
}

export default FileInput;
