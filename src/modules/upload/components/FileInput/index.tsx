import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { fileToBase64, isFileValid, isFileSizeValid } from '@/app/services/file';
import UploadButton from '@/modules/upload/components/UploadButton';
import Notification, { NotificationType } from '@/app/components/Notification';
import { sanitizeName } from '@/app/services/navigator';
import pdf_icons from '@/app/assets/svg/pdf_icon.svg';
import Button, { ButtonStyle } from '@/app/components/Button';
import crossIcon from '@/app/assets/svg/cancel.svg';
import addIcon from '@/app/assets/svg/cross.svg';

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

    if (!isFileValid(inputFile) || !isFileSizeValid(inputFile)) {
      setFile(undefined);
      setFilename(undefined);

      setError(isFileSizeValid(inputFile) ? t('upload.errors.wrong_file_type') : t('upload.errors.file_too_big'));
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

  const handleOpenFile: () => void = useCallback(() => {
    if (fileHandler.current) {
      fileHandler.current.click();
    }
  }, [fileHandler]);

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

  const canDisplayText = useMemo(() => !filename && !error, [filename, error]);

  return (
    <>
      <form className={styles.fileInput_container}>
        <div className={styles.fileInput_icons} onClick={handleOpenFile} onKeyDown={handleOpenFile} role={'button'} tabIndex={0}>
          <button className={styles.morphButton} type={'button'} data-status={!!error}>
            <img src={addIcon} alt={'add icon'} />
          </button>
          <img src={pdf_icons} alt={'pdf icon'} height={148} width={288} />
          {canDisplayText && <p>{t('upload.max_size')}</p>}
        </div>

        {canDisplayText && <p className={styles.description}>{t('upload.input')}</p>}

        <input id={'fileLoader'} type={'file'} accept={'application/pdf'} className={styles.fileInput} ref={fileHandler} />
      </form>

      <div className={styles.fileInput_controls}>
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
        <UploadButton />
      </div>
    </>
  );
}

export default FileInput;
