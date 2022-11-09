import { useMemo } from 'react';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import FileInput from '@/modules/upload/components/FileInput';
import UploadFile from '@/modules/upload/components/UploadFile';
import NewUploadButton from '@/modules/upload/components/NewUploadButton';
import DragOverlay from '@/modules/upload/components/DragOverlay';
import { useIsSmallDevice } from '@/app/hooks/useIsMobile';

function Upload(): JSX.Element {
  const { status, isDragActive } = useUpload();
  const isSmallDevice: boolean = useIsSmallDevice();

  const renderContent: JSX.Element | null = useMemo(() => {
    switch (status) {
      case UploadStatus.IDLE:
        return <FileInput />;
      case UploadStatus.UPLOADING:
      case UploadStatus.SUCCESS:
        return <UploadFile />;
      case UploadStatus.ERROR:
        return <UploadFile />;
      default:
        return null;
    }
  }, [status]);

  const renderOverlay: JSX.Element | null = useMemo(() => {
    if (isSmallDevice || !isDragActive || status !== UploadStatus.IDLE) {
      return null;
    }

    return <DragOverlay />;
  }, [isDragActive, isSmallDevice]);

  return (
    <>
      {renderOverlay}
      <div className={'fade-in grow self-center safe'}>
        {renderContent}
        {status === UploadStatus.SUCCESS && <NewUploadButton />}
      </div>
    </>
  );
}

export default Upload;
