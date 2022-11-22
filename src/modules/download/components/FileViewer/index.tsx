import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import useWindowSize from '@/app/hooks/useWindowSize';
import useIsMobile from '@/app/hooks/useIsMobile';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import Logo from '@/app/components/Logo';
import LangSwitcher from '@/app/components/LangSwitcher';
import { timeRemaining } from '@/app/utils/time';
import NotFound from '@/app/components/NotFound';
import Loader from '@/app/components/Loader';
import Download from '@/modules/download/components/Download';
import ShareIcon from '@/app/assets/svg/share_white.svg';

import styles from '@/modules/download/components/FileViewer/styles.module.scss';

function FileViewer(): JSX.Element {
  const { file, expiresIn, isLoading, error } = useDownload();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width, height } = useWindowSize();
  const isMobile: boolean = useIsMobile();
  const { t } = useTranslation();

  const fileSize: { width: number | undefined; height: number | undefined } = useMemo(
    () => ({
      width: isMobile ? width * 0.8 : undefined, // use default file width if desktop
      height: isMobile ? undefined : height * 0.8,
    }),
    [width, height, isMobile],
  );

  const isFirstPage: boolean = useMemo(() => pageNumber === 1, [pageNumber]);

  const isLastPage: boolean = useMemo(() => pageNumber === numPages, [pageNumber, numPages]);

  const handleShare: () => Promise<void> = () => nativeShare(window.location.href);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }): void => {
      setNumPages(nextNumPages);
    },
    [file],
  );

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

  const nextNumPages = useCallback((): void => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const prevNumPages = useCallback((): void => {
    setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  const renderPage: JSX.Element = useMemo(
    () => <Page width={fileSize.width} height={fileSize.height} className={styles.preview} pageNumber={pageNumber} />,
    [fileSize, pageNumber],
  );

  const renderDocument: JSX.Element = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <Document className={`${styles.viewerParent} fade-in d-50`} file={file} onLoadSuccess={onPDFReady}>
        <div className={styles.controls}>
          {numPages > 1 && (
            <button
              disabled={isFirstPage}
              type={'button'}
              onClick={prevNumPages}
              aria-label={t('fileviewer.previousPage')}
              name={t('fileviewer.previousPage')}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
          )}

          {numPages > 1 && (
            <button
              disabled={isLastPage}
              type={'button'}
              onClick={nextNumPages}
              aria-label={t('fileviewer.nextPage')}
              name={t('fileviewer.nextPage')}>
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          )}

          {canUseNativeShare() && (
            <button
              className={styles.shareBtn}
              type={'button'}
              onClick={handleShare}
              aria-label={t('fileviewer.share')}
              name={t('fileviewer.share')}>
              <img src={ShareIcon} alt={t('fileviewer.share')} />
              {isMobile && t('fileviewer.share')}
            </button>
          )}
        </div>
        {renderPage}
      </Document>
    );
  }, [isLoading, renderPage, ShareIcon, isMobile, t, numPages, isFirstPage, isLastPage, handleShare, prevNumPages, nextNumPages]);

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
