import { useMemo, useCallback, lazy } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import lockerSvg from '@/app/assets/svg/locker.svg';
import lockerOpenSvg from '@/app/assets/svg/locker_open.svg';
import Tooltip, { TooltipPosition } from '@/app/components/Tooltip';
import validIcon from '@/app/assets/svg/validation.svg';

import styles from '@/modules/upload/components/UploadFile/styles.module.scss';

const SuccessConfetti = lazy(() => import('@/app/components/SuccessConfetti'));

function UploadFile(): JSX.Element {
  const { filename, fileWeight, status, shareUrl } = useUpload();
  const { t } = useTranslation();

  const renderProgress: JSX.Element | null = useMemo(() => {
    if (status === UploadStatus.SUCCESS) {
      return <img src={lockerSvg} alt={'locker'} />;
    }
    if (status === UploadStatus.UPLOADING) {
      return <img src={lockerOpenSvg} alt={'locker open'} />;
    }
    return null;
  }, [status]);

  const statusClass: string = useMemo(() => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return classNames(styles.fileContainer, styles.uploading);
      case UploadStatus.SUCCESS:
        return classNames(styles.fileContainer, styles.success);
      default:
        return styles.fileContainer;
    }
  }, [status]);

  const renderLink: JSX.Element = useMemo(() => {
    if (!shareUrl || status !== UploadStatus.SUCCESS) {
      return <p>{t('upload.link.loading')}</p>;
    }

    return (
      <a href={shareUrl} target={'_blank'} rel={'noreferrer'}>
        {shareUrl}
      </a>
    );
  }, [shareUrl, status, t]);

  const handlePreview = useCallback((): void => {
    if (!shareUrl) {
      return;
    }

    window.open(shareUrl, '_blank');
  }, [shareUrl]);

  const renderSuccessAnim: JSX.Element | null = useMemo(() => {
    if (status === UploadStatus.SUCCESS) {
      return <SuccessConfetti />;
    }

    return null;
  }, [status]);

  const renderTootlip: JSX.Element | null = useMemo(() => {
    if (status !== UploadStatus.SUCCESS) {
      return null;
    }

    return (
      <Tooltip position={TooltipPosition.topRight}>
        <img src={validIcon} alt={'validation icon'} />
        {t('common.tooltip.copied')}
      </Tooltip>
    );
  }, [status, t]);

  const fileWeightInKB: number = useMemo(() => Math.round(fileWeight / 1024), [fileWeight]);

  return (
    <div className={statusClass}>
      <div className={styles.fileInfo} onClick={handlePreview} onKeyDown={handlePreview} role={'button'} tabIndex={0}>
        <div>
          <FontAwesomeIcon icon={faFileLines} />
          {filename}
        </div>
        <p className={styles.fileWeight}>{fileWeightInKB}KB . pdf</p>
      </div>
      <div className={styles.statusConnector}>
        <div className={styles.progress}>{renderProgress}</div>
        <div className={styles.link} />
        {renderSuccessAnim}
      </div>
      <div className={'p-relative w100'}>
        <div className={styles.fileLink}>{renderLink}</div>
        {renderTootlip}
      </div>
    </div>
  );
}

export default UploadFile;
