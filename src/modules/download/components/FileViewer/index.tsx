import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import useIsMobile from '@/app/hooks/useIsMobile';
import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';
import { timeRemaining } from '@/app/utils/time';
import NotFound from '@/app/components/NotFound';
import Download from '@/modules/download/components/Download';
import Document from '@/modules/download/components/Document';
import Loader from '@/app/components/Loader';

import styles from '@/modules/download/components/FileViewer/styles.module.scss';

function FileViewer(): JSX.Element {
  const { file, fileName, expiresIn, isLoading, error } = useDownload();
  const isMobile: boolean = useIsMobile();
  const { t } = useTranslation();

  const renderTimeRemaining: JSX.Element | null = useMemo(() => {
    if (!expiresIn) {
      return null;
    }

    if (expiresIn < Date.now()) {
      return <p>{t('fileviewer.expired')}</p>;
    }

    return (
      <p>
        {t('fileviewer.estimation')} {timeRemaining(expiresIn)}
      </p>
    );
  }, [expiresIn, t]);

  const renderDocument = useMemo(() => {
    if (!!file && !!fileName) {
      return <Document file={file} fileName={fileName} />;
    }

    return <Loader />;
  }, [file, fileName]);

  if (!file && !isLoading && error) {
    return <NotFound information={error?.message} />;
  }

  return (
    <div className={'container justify-center flex-row'}>
      {!isMobile && (
        <div className={'logo'}>
          <Logo />
        </div>
      )}
      <div className={styles.fileViewer}>
        {isMobile && (
          <header className={'main-header fade-in'}>
            <Logo />
            <LangSwitcher />
          </header>
        )}
        <div className={'safe d-flex flex-column grow t25'}>
          <h1>{t('fileviewer.title')}</h1>
          {renderTimeRemaining}
          {isMobile && <Download />}
          {renderDocument}
        </div>
      </div>
    </div>
  );
}

export default FileViewer;
