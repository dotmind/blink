import { useMemo } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import lockerSvg from '@/app/assets/svg/locker.svg';
import lockerOpenSvg from '@/app/assets/svg/locker_open.svg';

import styles from '@/modules/upload/components/UploadFile/styles.module.scss';

function UploadFile() {
  const { filename, fileWeight, status, shareUrl } = useUpload();

  const renderProgress = useMemo(() => {
    if (status === UploadStatus.SUCCESS) {
      return <img src={lockerSvg} alt={'locker'} />;
    }
    if (status === UploadStatus.UPLOADING) {
      return <img src={lockerOpenSvg} alt={'locker open'} />;
    }
    return null;
  }, [status]);

  const statusClass = useMemo(() => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return classNames(styles.fileContainer, styles.uploading);
      case UploadStatus.SUCCESS:
        return classNames(styles.fileContainer, styles.success);
      default:
        return styles.fileContainer;
    }
  }, [status]);

  const renderLink = useMemo(() => {
    if (!shareUrl || status !== UploadStatus.SUCCESS) {
      return <p>Chargement ...</p>;
    }

    return (
      <a href={shareUrl} target={'_blank'} rel={'noreferrer'}>
        {shareUrl}
      </a>
    );
  }, [shareUrl, status]);

  const fileWeightInKB = useMemo(() => Math.round(fileWeight / 1024), [fileWeight]);

  return (
    <div className={statusClass}>
      <div className={styles.fileInfo}>
        <div>
          <FontAwesomeIcon icon={faFileLines} />
          <p>{filename}</p>
        </div>
        <p className={styles.fileWeight}>{fileWeightInKB}KB . pdf</p>
      </div>
      <div className={styles.statusConnector}>
        <div className={styles.progress}>{renderProgress}</div>
        <div className={styles.link} />
      </div>
      <div className={styles.fileLink}>{renderLink}</div>
    </div>
  );
}

export default UploadFile;
