import { pdfjs, Document as PdfDocument, Page } from 'react-pdf';
import { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import useWindowSize from '@/app/hooks/useWindowSize';
import useIsMobile from '@/app/hooks/useIsMobile';
import { canUseNativeShare, nativeShare } from '@/app/services/navigator';
import ShareIcon from '@/app/assets/svg/share_white.svg';
import ShareIcon2 from '@/app/assets/svg/share_2.svg';

import styles from '@/modules/download/components/Document/styles.module.scss';

interface IProps {
  file: string;
  fileName: string;
  url?: string;
}

function Document({ file, fileName, url }: IProps): JSX.Element {
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

  const handleShare: () => Promise<void> = () => nativeShare(window.location.href, fileName as string);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }): void => {
      setNumPages(nextNumPages);
    },
    [file],
  );

  const nextNumPages = useCallback((): void => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const prevNumPages = useCallback((): void => {
    setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  const renderOpenLink: JSX.Element | null = useMemo(() => {
    if (!url) {
      return null;
    }

    return (
      <a className={styles.openLink} href={url}>
        <img src={ShareIcon2} alt={t('fileviewer.open_link')} />
      </a>
    );
  }, [url]);

  const renderPage: JSX.Element = useMemo(
    () => <Page width={fileSize.width} height={fileSize.height} className={styles.preview} pageNumber={pageNumber} />,
    [fileSize, pageNumber],
  );

  return (
    <PdfDocument className={`${styles.viewerParent} fade-in d-50`} file={file} onLoadSuccess={onPDFReady}>
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

        {renderOpenLink}
      </div>
      {renderPage}
    </PdfDocument>
  );
}

Document.defaultProps = {
  url: undefined,
};

export default Document;
