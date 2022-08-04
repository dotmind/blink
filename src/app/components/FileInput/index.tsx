import { useEffect, useRef, useState } from 'react';
import { useUpload } from '@/app/providers/UploadProvider';
import { fileToBase64 } from '@/app/services/File';
import classNames from 'classnames';
import styles from './styles.module.css';

const FileInput = () => {
  const { file, setFile } = useUpload();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileHandler = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fhRef = fileHandler.current;
    if (!fhRef) {
      return;
    }

    const onFileChange = async () => {
      if (!fhRef.files) {
        return;
      }

      const file = fhRef.files[0];
      // TODO: check if file is PDF or return error
      const base64 = await fileToBase64(file);
      setFile(base64);

    };

    const cancelEvent = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleIsActive = (active: boolean) => (event: DragEvent) => {
      setIsDragActive(active);
      cancelEvent(event);
    };

    const handleDrop = (e: DragEvent) => {
      fhRef.files = e.dataTransfer?.files || null;
      onFileChange();
      cancelEvent(e);
    };

    if (fhRef) {
      window.addEventListener('dragover', handleIsActive(true));
      window.addEventListener('dragleave', handleIsActive(false));
      window.addEventListener('dragenter', cancelEvent);
      window.addEventListener('drop', handleDrop);
    }

    return () => {
      window.removeEventListener('dragover', handleIsActive(true));
      window.removeEventListener('dragleave', handleIsActive(false));
      window.removeEventListener('dragenter', cancelEvent);
      window.removeEventListener('drop', handleDrop);
    };
  }, [file]);

  const styleHandler = classNames(styles.fileInput, {
    [styles.active]: isDragActive,
  });

  return (
    <div className={styleHandler}>
      <label htmlFor='fileLoader' className={styles.fileInput__label}>
        Drop file here
      </label>
      <input id='fileLoader' type='file' className={styles.fileInput__input} ref={fileHandler} />
    </div>
  );
};

export default FileInput;
