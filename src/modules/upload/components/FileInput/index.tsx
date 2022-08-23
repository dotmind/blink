import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { fileToBase64, isFileValid } from '@/app/services/file';
import UploadButton from '@/modules/upload/components/UploadButton';

import pdf_icons from '@/app/assets/svg/pdf_icon.svg';
import styles from '@/modules/upload/components/FileInput/styles.module.scss';

function FileInput() {
  const [error, setError] = useState<string | null>(null);
  const { file, setFile, filename, setFilename } = useUpload();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileHandler = useRef<HTMLInputElement>(null);

  const onFileChange = useCallback(async () => {
    if (!fileHandler.current || !fileHandler.current.files) {
      setError('Not found: missing file !');
      return;
    }

    const inputFile = fileHandler.current.files[0];

    if (!isFileValid(inputFile)) {
      setFile(undefined);
      setFilename(undefined);
      setError('Wrong file type: only PDF files are allowed !');
      return;
    }

    const base64 = await fileToBase64(inputFile);
    const { name } = inputFile;

    setError(null);
    setFilename(name);
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

  const styleHandler = classNames(styles.fileInput_container, {
    [styles.active]: isDragActive,
  });

  return (
    <>
      <form className={styleHandler}>
        {/* eslint-disable-next-line */}
        <div className={styles.fileInput_icons} onClick={() => fileHandler.current?.click()}>
          <img src={pdf_icons} alt={'pdf icon'} />
        </div>

        <p>Déposez un fichier ici pour créer un lien</p>

        <input id={'fileLoader'} type={'file'} className={styles.fileInput} ref={fileHandler} />
      </form>

      <div className={styles.fileInput_controls}>
        <UploadButton />
        {file && <p className={styles.fileOK}>{filename}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}

export default FileInput;
