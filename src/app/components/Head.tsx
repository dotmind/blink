import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import placeholder from '@/app/assets/images/placeholder.png';

function Head() {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t('common.name')}</title>
      <meta name={'description'} content={t('common.description')} />
      <meta property={'og:title'} content={t('common.name')} />
      <meta property={'og:description'} content={t('common.description')} />
      <meta property={'og:image'} content={placeholder} />
      <meta name={'theme-color'} content={'#47B0FF'} />
    </Helmet>
  );
}

export default Head;
