import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from '@/modules/download/components/Document/styles.module.scss';

interface IProps {
  file: string;
}

function Document({ file }: IProps): JSX.Element {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={styles.preview}>
      <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js'}>
        <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}

export default Document;
