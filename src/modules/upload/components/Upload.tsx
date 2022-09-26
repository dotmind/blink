import { useMemo } from 'react';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import FileInput from '@/modules/upload/components/FileInput';
import CircleWaves from '@/app/components/CircleWaves';
import UploadHeader from '@/modules/upload/components/UploadHeader';
import UploadFile from '@/modules/upload/components/UploadFile';
import ShareButtons from '@/modules/upload/components/ShareButtons';
import History from '@/app/components/History';
import ErrorModal from '@/app/components/ErrorModal';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import DragOverlay from '@/modules/upload/components/DragOverlay';
import { useIsSmallDevice } from '@/app/hooks/useIsMobile';

function Upload(): JSX.Element {
  const { status, isDragActive } = useUpload();
  const isSmallDevice = useIsSmallDevice();

  const renderContent = useMemo((): JSX.Element | null => {
    switch (status) {
      case UploadStatus.IDLE:
        return <FileInput />;
      case UploadStatus.UPLOADING:
      case UploadStatus.SUCCESS:
        return <UploadFile />;
      case UploadStatus.ERROR:
        return (
          <>
            <UploadFile />
            <ErrorModal />
          </>
        );
      default:
        return null;
    }
  }, [status]);

  const renderOverlay = useMemo((): JSX.Element | null => {
    if (isSmallDevice || !isDragActive) {
      return null;
    }

    return <DragOverlay />;
  }, [isDragActive, isSmallDevice]);

  return (
    <>
      {renderOverlay}
      <div className={'container fade-in'}>
        <UploadHeader />
        {renderContent}
        {status === UploadStatus.SUCCESS && <ShareButtons />}
        <History />
        <CircleWaves />
        <AnimatedBackground />
      </div>
    </>
  );
}

export default Upload;
