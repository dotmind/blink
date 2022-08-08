import { MouseEventHandler, useCallback } from 'react';

import { useUpload } from '@/app/providers/UploadProvider';

const UploadButton = () => {
  const { file } = useUpload();

  const handleUpload = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {}, [file]);

  return <button onClick={handleUpload}>Transfer</button>;
};

export default UploadButton;
