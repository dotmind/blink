import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

import { useUpload } from '@/app/providers/UploadProvider';
import { fileToBase64, isFileValid } from '@/app/services/file';
import UploadButton from '@/app/components/UploadButton';

import styles from '@/app/components/FileInput.module.css';

const FileInput = () => {
  const [error, setError] = useState<string | null>(null);
  const { file, setFile } = useUpload();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileHandler = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileHandler.current) {
      return;
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

  const onFileChange = useCallback(async () => {
    if (!fileHandler.current || !fileHandler.current.files) {
      setError('Not found: missing file !');
      return;
    }

    const inputFile = fileHandler.current.files[0];

    if (!isFileValid(inputFile)) {
      setFile(null);
      setError('Wrong file type: only PDF files are allowed !');
      return;
    }

    const base64 = await fileToBase64(inputFile);
    setError(null);
    setFile(base64);
  }, [file, fileHandler]);

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

  const styleHandler = classNames(styles.fileInput, {
    [styles.active]: isDragActive,
  });

  return (
    <div className={styleHandler}>
      {error && <p className={styles.error}>{error}</p>}
      <label htmlFor='fileLoader' className={styles.fileInput__label}>
        Drop file here
      </label>
      <input id='fileLoader' type='file' className={styles.fileInput__input} ref={fileHandler} />
      {file && <p className={styles.fileOK}>PDF loaded...</p>}
      {file && <UploadButton />}
    </div>
  );
};

export default FileInput;
