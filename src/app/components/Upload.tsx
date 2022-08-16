import { useMemo } from 'react';

import FileInput from '@/app/components/FileInput';
import { useUpload, UploadStatus } from '@/app/providers/UploadProvider';
import UploadButton from '@/app/components/UploadButton';
import History from '@/app/components/History';

import styles from '@/app/components/Upload.module.css';

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

      <History />
    </div>
  );
}

export default Upload;
