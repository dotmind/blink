import { useCallback, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

import styles from '@/modules/download/components/Download/styles.module.scss';

function Download() {
  const { file, fileName } = useDownload();

  const handleDownload = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (file && fileName) {
        const link = document.createElement('a');
        link.href = file;
        link.download = fileName;
        link.click();
      }
    },
    [file, fileName],
  );

  return (
    <button className={styles.downloadButton} type={'button'} onClick={handleDownload}>
      <div>
        <FontAwesomeIcon icon={faFileLines} />
        <p>{fileName}</p>
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <p className={styles.fileWeight}>448.58KB . pdf</p>
    </button>
  );
}

export default Download;
