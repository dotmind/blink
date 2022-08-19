import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback } from 'react';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

import styles from './styles.module.scss';

function FileViewer() {
  const { file } = useDownload();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }) => {
      setNumPages(nextNumPages);
    },
    [file],
  );

  return (
    <div className={styles.container}>
      <Document file={file} onLoadSuccess={onPDFReady}>
        <Page className={styles.preview} pageNumber={pageNumber} />
        <div className={styles.controls}>
          {pageNumber < numPages && (
            <button type={'button'} onClick={() => setPageNumber(pageNumber + 1)}>
              Next
            </button>
          )}
          {pageNumber > 1 && (
            <button type={'button'} onClick={() => setPageNumber(pageNumber - 1)}>
              Previous
            </button>
          )}
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Document>
    </div>
  );
}

export default FileViewer;