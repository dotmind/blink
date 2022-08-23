import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useDownload } from '@/modules/download/providers/DownloadProvider';
import useWindowSize from '@/app/hooks/useWindowSize';
import Download from '@/modules/download/components/Download';

import styles from '@/modules/download/components/FileViewer/styles.module.scss';

function FileViewer() {
  const { file } = useDownload();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width, height } = useWindowSize();

  const isMobile = useMemo(() => width < 768, [width]);

  const fileSize = useMemo(
    () => ({
      width: isMobile ? width * 0.8 : undefined, // use default file width if desktop
      height: height * 0.8,
    }),
    [height],
  );

  const isFirstPage = useMemo(() => pageNumber === 1, [pageNumber]);

  const isLastPage = useMemo(() => pageNumber === numPages, [pageNumber, numPages]);

  const handleShare = useCallback(() => {
    // @TODO: use native share dialog or copy to clipboard current url
    navigator.clipboard.writeText(window.location.href);
  }, [file]);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }) => {
      setNumPages(nextNumPages);
    },
    [file],
  );

  return (
    <div className={'container justify-center flex-row'}>
      <div className={styles.fileViewer}>
        <header>
          <h1>Tu as reçu un fichier !</h1>
          <p>Ce fichier expireras dans 14 jours !</p>
        </header>
        <Download />
        <Document className={styles.viewerParent} file={file} onLoadSuccess={onPDFReady}>
          <Page width={fileSize.width} height={fileSize.height} className={styles.preview} pageNumber={pageNumber} />
          <div className={styles.controls}>
            <button disabled={isFirstPage} type={'button'} onClick={() => setPageNumber(pageNumber - 1)}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>

            <button disabled={isLastPage} type={'button'} onClick={() => setPageNumber(pageNumber + 1)}>
              <FontAwesomeIcon icon={faCaretRight} />
            </button>

            <button type={'button'} onClick={handleShare}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </button>
          </div>
        </Document>
      </div>
    </div>
  );
}

export default FileViewer;
