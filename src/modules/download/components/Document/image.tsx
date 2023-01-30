/* eslint-disable @typescript-eslint/no-loop-func */
import { useEffect, useRef, useState, useCallback } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, version } from 'pdfjs-dist';

import Loader from '@/app/components/Loader';

import styles from '@/modules/download/components/Document/styles.module.scss';

interface IProps {
  file: string;
}

function Document({ file }: IProps): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 300, height: 300 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderPage = useCallback(
    (pdf: PDFDocumentProxy, index: number, numPages: number) => {
      pdf.getPage(index).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context !== null) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          if (size.width !== viewport.width || size.height !== viewport.height) {
            setSize({ width: viewport.width, height: viewport.height });
          }

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          page.render(renderContext).promise.then(() => {
            container.current?.appendChild(canvas);
            if (isLoading) {
              setIsLoading(false);
            }
          });
          if (index < numPages) {
            renderPage(pdf, index + 1, numPages);
          }
        }
      });
    },
    [size, isLoading, setIsLoading],
  );

  useEffect(() => {
    GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;
    const loadingTask = getDocument(file);

    loadingTask.promise.then((pdf) => {
      if (container.current !== null) {
        const { numPages } = pdf;
        renderPage(pdf, 1, numPages);
      }
    });
  }, []);

  return (
    <div className={styles.viewer}>
      <div className={styles.preview} ref={container} style={{ width: size.width }} />
      {isLoading && (
        <div className={styles.center}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Document;
