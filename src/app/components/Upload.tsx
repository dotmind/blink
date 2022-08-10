import { Link } from 'react-router-dom';

import FileInput from '@/app/components/FileInput';
import { useUpload, UploadStatus } from '@/app/providers/UploadProvider';
import UploadButton from '@/app/components/UploadButton';

import styles from '@/app/components/Upload.module.css';

const Upload = () => {
  const { file, status } = useUpload();

  return (
    <div className={styles.container}>
      <FileInput />
      {file && <UploadButton />}

      {status === UploadStatus.UPLOADING && <p>Uploading...</p>}
      {status === UploadStatus.SUCCESS && <p>Upload successful!</p>}
      {status === UploadStatus.ERROR && <p>Upload failed!</p>}
    </div>
  );
};

export default Upload;
