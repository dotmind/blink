import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { fileToBase64, isFileValid } from '@/app/services/file';
import UploadButton from '@/modules/upload/components/UploadButton';
import Notification, { NotificationType } from '@/app/components/Notification';
import pdf_icons from '@/app/assets/svg/pdf_icon.svg';
import { sanitizeName } from '@/app/services/navigator';
import Button, { ButtonStyle } from '@/app/components/Button';
import crossIcon from '@/app/assets/svg/cancel.svg';

import styles from '@/modules/upload/components/FileInput/styles.module.scss';

function FileInput(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const { file, setFile, filename, setFilename, setFileWeight, setIsDragActive } = useUpload();
  const fileHandler = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const onFileChange: () => Promise<void> = useCallback(async () => {
    if (!fileHandler.current || !fileHandler.current.files) {
      setError(t('upload.file_not_found'));
      return;
    }

    const inputFile: File = fileHandler.current.files[0];

    if (!isFileValid(inputFile)) {
      setFile(undefined);
      setFilename(undefined);
      setError(t('upload.errors.wrong_file_type'));
      return;
    }

    const base64: ArrayBuffer = (await fileToBase64(inputFile)) as ArrayBuffer;
    const { name } = inputFile;

    setError(null);
    setFilename(sanitizeName(name));
    setFileWeight(inputFile.size);
    setFile(base64);
  }, [file, fileHandler, setFile, setFilename, setFileWeight]);

  const cancelEvent: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleIsActive: (active: boolean) => (event: DragEvent) => void = useCallback(
    (active: boolean) => (event: DragEvent) => {
      cancelEvent(event);
      setIsDragActive(active);
    },
    [cancelEvent, setIsDragActive],
  );

  const handleDrop: (e: DragEvent) => void = useCallback(
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

  const handleChangeFile: () => void = useCallback(() => {
    setFile(undefined);
    setFilename(undefined);
    setError(null);
  }, [setFile, setFilename, setError]);

  const handleDismissError: () => void = useCallback(() => {
    setError(null);
  }, [setError]);

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
        <UploadButton input={fileHandler.current} isValid={!error} />
        {file && (
          <Notification type={NotificationType.SUCCESS} key={filename}>
            {filename}
            <Button style={ButtonStyle.NONE} name={'cancel'} callback={handleChangeFile}>
              <img src={crossIcon} alt={'cross icon'} height={'100%'} width={'100%'} />
            </Button>
          </Notification>
        )}
        {error && (
          <Notification type={NotificationType.ERROR}>
            {error}
            <Button style={ButtonStyle.NONE} name={'cancel'} callback={handleDismissError}>
              <img src={crossIcon} alt={'cross icon'} height={'100%'} width={'100%'} />
            </Button>
          </Notification>
        )}
      </div>
    </>
  );
}

export default FileInput;
