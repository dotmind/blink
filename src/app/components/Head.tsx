import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import placeholder from '@/app/assets/images/placeholder.webp';

function Head() {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t('common.name')}</title>
      <meta name={'description'} content={t('common.description')} />
      <meta property={'og:title'} content={t('common.name')} />
      <meta property={'og:description'} content={t('common.description')} />
      <meta property={'og:image'} content={placeholder} />
      <meta property={'og:image:width'} content={'1200'} />
      <meta property={'og:image:height'} content={'630'} />
      <meta name={'theme-color'} content={'#47B0FF'} />

      <link rel={'apple-touch-icon'} sizes={'180x180'} href={'/apple-touch-icon.png'} />
      <link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicon-32x32.png'} />
      <link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicon-16x16.png'} />
      <link rel={'manifest'} href={'/site.webmanifest'} />
      <link rel={'mask-icon'} href={'/safari-pinned-tab.svg'} color={'#47B0FF'} />

      <meta name={'msapplication-TileColor'} content={'#47B0FF'} />
      <meta name={'msapplication-config'} content={'/browserconfig.xml'} />

      <meta name={'twitter:card'} content={'summary_large_image'} />
      <meta name={'twitter:site'} content={'@noshitapp'} />
      <meta name={'twitter:creator'} content={'@noshitapp'} />
      <meta name={'twitter:title'} content={t('common.name')} />
      <meta name={'twitter:description'} content={t('common.description')} />
      <meta name={'twitter:image'} content={placeholder} />
    </Helmet>
  );
}

export default Head;
