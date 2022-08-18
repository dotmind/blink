import { useMemo } from 'react';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import FileInput from '@/modules/upload/components/FileInput';
import UploadButton from '@/modules/upload/components/UploadButton';

import styles from './styles.module.scss';

function Upload() {
  const { file, status, shareUrl } = useUpload();

  const renderShare = useMemo(() => {
    if (!shareUrl || status !== UploadStatus.SUCCESS) {
      return null;
    }

    return (
      <a href={shareUrl} target={'_blank'} rel={'noreferrer'}>
        {shareUrl}
      </a>
    );
  }, [shareUrl, status]);

  return (
    <div className={styles.container}>
      <FileInput />
      {file && <UploadButton />}

      {status === UploadStatus.UPLOADING && <p>Uploading...</p>}
      {status === UploadStatus.SUCCESS && <p>Upload successful!</p>}
      {status === UploadStatus.ERROR && <p>Upload failed!</p>}

      {renderShare}
    </div>
  );
}

export default Upload;
