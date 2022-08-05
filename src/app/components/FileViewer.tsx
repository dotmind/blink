import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback } from 'react';

import { useUpload } from '@/app/providers/UploadProvider';

import styles from '@/app/components/FileViewer.module.css';

const FileViewer = () => {
  const { file } = useUpload();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // pdf worker config for vite bundle
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const onPDFReady = useCallback(({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
  }, []);

  return (
    <Document className={styles.preview} file={file} onLoadSuccess={onPDFReady}>
      <Page pageNumber={pageNumber} />
      <div className={styles.controls}>
        {pageNumber < numPages && <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>}
        {pageNumber > 1 && <button onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>}
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </Document>
  );
};

export default FileViewer;
