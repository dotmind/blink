import { Link } from 'react-router-dom';

import FileInput from '@/app/components/FileInput';
import { useUpload } from '@/app/providers/UploadProvider';
import UploadButton from '@/app/components/UploadButton';

import styles from '@/app/components/Upload.module.css';

const Upload = () => {
  const { file } = useUpload();

  return (
    <div className={styles.container}>
      <FileInput />
      {file && (
        <Link className={styles.preview_link} to='/a'>
          Preview
        </Link>
      )}
      {file && <UploadButton />}
    </div>
  );
};

export default Upload;
