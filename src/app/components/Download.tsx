import { useCallback, MouseEvent } from 'react';

import { useDownload } from '@/app/providers/DownloadProvider';

import styles from '@/app/components/Download.module.css';

const Download = () => {
  const { file } = useDownload();

  const handleDownload = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = file as string;
      link.download = 'file.pdf';
      link.click();
    },
    [file],
  );

  return (
    <div className={styles.container}>
      <button type='button' disabled={!file} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Download;
