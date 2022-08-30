import { useCallback, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from '@/modules/download/components/Download/styles.module.scss';

interface IProps {
  file: string;
  fileName: string;
}

function Download({ file, fileName }: IProps) {
  const handleDownload = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = file as string;
      link.download = fileName;
      link.click();
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
