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

function Upload() {
  const { status } = useUpload();

  const renderContent = useMemo(() => {
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

  return (
    <div className={'container fade-in'}>
      <UploadHeader />
      {renderContent}
      {status === UploadStatus.SUCCESS && <ShareButtons />}
      <History />
      <CircleWaves />
      <AnimatedBackground />
    </div>
  );
}

export default Upload;
