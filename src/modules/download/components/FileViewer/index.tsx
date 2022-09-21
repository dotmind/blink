import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import useWindowSize from '@/app/hooks/useWindowSize';
import useIsMobile from '@/app/hooks/useIsMobile';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import HomeButton from '@/app/components/HomeButton';
import { timeRemaining } from '@/app/utils/time';
import NotFound from '@/app/components/NotFound';
import Loader from '@/app/components/Loader';

import styles from '@/modules/download/components/FileViewer/styles.module.scss';
import Download from '../Download';

function FileViewer() {
  const { file, expiresIn, isLoading, error } = useDownload();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width, height } = useWindowSize();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const fileSize = useMemo(
    () => ({
      width: isMobile ? width * 0.8 : undefined, // use default file width if desktop
      height: height * 0.8,
    }),
    [width, height, isMobile],
  );

  const isFirstPage = useMemo(() => pageNumber === 1, [pageNumber]);

  const isLastPage = useMemo(() => pageNumber === numPages, [pageNumber, numPages]);

  const handleShare = () => nativeShare(window.location.href);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }) => {
      setNumPages(nextNumPages);
    },
    [file],
  );

  const renderTimeRemaining = useMemo(() => {
    if (!expiresIn) {
      return null;
    }

    return (
      <p>
        {t('fileviewer.estimation')} {timeRemaining(expiresIn)}
      </p>
    );
  }, [expiresIn, t]);

  if (isLoading) {
    return <Loader />;
  }

  if (!file && !isLoading && error) {
    return <NotFound information={error?.message} />;
  }

  return (
    <div className={'container justify-center flex-row'}>
      <HomeButton />
      <div className={styles.fileViewer}>
        <header className={'fade-in'}>
          <h1>{t('fileviewer.title')}</h1>
          {renderTimeRemaining}
        </header>
        {isMobile && <Download />}
        <Document className={`${styles.viewerParent} fade-in d-50`} file={file} onLoadSuccess={onPDFReady}>
          <Page width={fileSize.width} height={fileSize.height} className={styles.preview} pageNumber={pageNumber} />
          <div className={styles.controls}>
            <button
              disabled={isFirstPage}
              type={'button'}
              onClick={() => setPageNumber(pageNumber - 1)}
              aria-label={t('fileviewer.previousPage')}
              name={t('fileviewer.previousPage')}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>

            <button
              disabled={isLastPage}
              type={'button'}
              onClick={() => setPageNumber(pageNumber + 1)}
              aria-label={t('fileviewer.nextPage')}
              name={t('fileviewer.nextPage')}>
              <FontAwesomeIcon icon={faCaretRight} />
            </button>

            {canUseNativeShare() && (
              <button type={'button'} onClick={handleShare} aria-label={t('fileviewer.share')} name={t('fileviewer.share')}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </button>
            )}
          </div>
        </Document>
      </div>
    </div>
  );
}

export default FileViewer;
