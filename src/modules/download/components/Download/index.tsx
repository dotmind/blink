import { useCallback, MouseEvent } from 'react';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

import styles from './styles.module.scss';

function Download() {
  const { file, fileName } = useDownload();

  const handleDownload = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = file as string;
      link.download = fileName as string;
      link.click();
    },
    [file],
  );

  return (
    <div className={styles.container}>
      <button type={'button'} disabled={!file} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}

export default Download;
