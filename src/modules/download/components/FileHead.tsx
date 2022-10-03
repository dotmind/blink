import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

function FileHead(): JSX.Element | null {
  const { fileName } = useDownload();
  const { t } = useTranslation();

  const render = useMemo(() => {
    if (!fileName) {
      return null;
    }

    return (
      <Helmet>
        <title>{`Blink - ${fileName}`}</title>
        <meta name={'description'} content={`${t('common.share.download')} ${fileName} - ${t('common.share.description')}`} />
        <meta property={'og:title'} content={`Blink - ${fileName}`} />
        <meta property={'og:type'} content={'website'} />
        <meta property={'og:url'} content={window.location.href} />
        <meta
          property={'og:description'}
          content={`${t('common.share.download')} ${fileName} - ${t('common.share.description')}`}
        />

        <meta property={'twitter:title'} content={`Blink - ${fileName}`} />
        <meta
          property={'twitter:description'}
          content={`${t('common.share.download')} ${fileName} - ${t('common.share.description')}`}
        />
      </Helmet>
    );
  }, [fileName, t]);

  return render;
}

export default FileHead;
