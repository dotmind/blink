import { useRef, useEffect } from 'react';

interface IProps {
  file: string;
}

function Document({ file }: IProps): JSX.Element {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('adobe_dc_view_sdk.ready', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const adobeDCView = new AdobeDC.View({ clientId: 'e06db12dfd5543fb8c14b1f34617c41e', divId: 'adobe-dc-view' });
      adobeDCView.previewFile({
        content: { location: { url: file } },
        metaData: { fileName: 'filename.pdf' },
      });
    });
  }, [container]);

  return <div ref={container} id={'adobe-dc-view'} />;
}

export default Document;
