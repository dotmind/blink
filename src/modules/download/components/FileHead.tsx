import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

function FileHead(): JSX.Element {
  const { fileName } = useDownload();
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{`Noshit - ${fileName}`}</title>
      <meta name={'description'} content={`${t('common.share.download')} ${fileName} - ${t('common.share.description')}`} />
      <meta property={'og:title'} content={`Noshit - ${fileName}`} />
      <meta
        property={'og:description'}
        content={`${t('common.share.download')} ${fileName} - ${t('common.share.description')}`}
      />
    </Helmet>
  );
}

export default FileHead;
