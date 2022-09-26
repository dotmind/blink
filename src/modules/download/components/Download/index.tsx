import { useCallback, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import { prepareFileName } from '@/app/services/navigator';

import styles from '@/modules/download/components/Download/styles.module.scss';

function Download() {
  const { file, fileName } = useDownload();
  const { t } = useTranslation();

  const handleDownload = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (file && fileName) {
        const link = document.createElement('a');
        link.href = file;
        link.download = prepareFileName(fileName);
        link.click();
      }
    },
    [file, fileName],
  );

  if (!file) {
    return null;
  }

  return (
    <button
      className={`${styles.downloadButton} fade-in d-25`}
      type={'button'}
      onClick={handleDownload}
      aria-label={t('download.download')}
      name={t('download.download')}>
      <div>
        <FontAwesomeIcon icon={faFileLines} />
        <p>{fileName}</p>
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      {/* @TODO - Add file weight */}
      <p className={styles.fileWeight}>448.58KB . pdf</p>
    </button>
  );
}

export default Download;
