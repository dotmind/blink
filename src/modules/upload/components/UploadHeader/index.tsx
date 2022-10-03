import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import Logo from '@/app/components/Logo';

import styles from '@/modules/upload/components/UploadHeader/styles.module.scss';

function UploadHeader(): JSX.Element {
  const { status } = useUpload();
  const container = useRef(null);
  const { t } = useTranslation();

  const renderHeader: JSX.Element = useMemo(() => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return (
          <>
            <h1>{t('upload.headers.uploading.title')}</h1>
            <p>{t('upload.headers.uploading.description')}</p>
          </>
        );

      case UploadStatus.SUCCESS:
        return (
          <>
            <h1>{t('upload.headers.success.title')}</h1>
            <p>{t('upload.headers.success.description')}</p>
          </>
        );

      case UploadStatus.IDLE:
      default:
        return (
          <>
            <h1>{t('upload.headers.idle.title')}</h1>
            <p>{t('upload.headers.idle.description')}</p>
          </>
        );
    }
  }, [status]);

  return (
    <header ref={container} className={styles.header}>
      <Logo />
      {renderHeader}
    </header>
  );
}

export default UploadHeader;
