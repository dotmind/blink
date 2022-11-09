import { useCallback, MouseEvent, useMemo } from 'react';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import { prepareFileName, getFileWeight } from '@/app/services/navigator';

import styles from '@/modules/download/components/Download/styles.module.scss';

function Download(): JSX.Element | null {
  const { file, fileName } = useDownload();
  const { t } = useTranslation();

  const handleDownload: (e: MouseEvent) => void = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (file && fileName) {
        saveAs(file, prepareFileName(fileName));
      }
    },
    [file, fileName],
  );

  const renderFileWeight: string = useMemo(() => {
    if (!file) {
      return '';
    }
    const fileWeightInKB = getFileWeight(file);

    if (fileWeightInKB > 1000) {
      return `${fileWeightInKB / 1000}MB`;
    }

    return `${fileWeightInKB}KB`;
  }, [file]);

  const renderComponent: JSX.Element | null = useMemo(() => {
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
        <p className={styles.fileWeight}>{renderFileWeight} . pdf</p>
      </button>
    );
  }, [file, fileName, renderFileWeight]);

  return renderComponent;
}

export default Download;
