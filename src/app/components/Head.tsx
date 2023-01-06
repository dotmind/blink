import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function Head(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t('common.name')}</title>
      <meta name={'description'} content={t('common.description')} />
      <meta name={'viewport'} content={'width=device-width,initial-scale=1,maximum-scale=5'} />
      <meta property={'og:title'} content={t('common.name')} />
      <meta property={'og:description'} content={t('common.description')} />
      <meta property={'og:image'} content={'/assets/meta_image.jpg'} />
      <meta property={'og:image:width'} content={'1200'} />
      <meta property={'og:image:height'} content={'630'} />
      <meta name={'theme-color'} content={'#FFFFFF'} />

      <link rel={'apple-touch-icon'} sizes={'180x180'} href={'/assets//apple-touch-icon.png'} />
      <link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/assets/favicon-32x32.png'} />
      <link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/assets/favicon-16x16.png'} />
      <link rel={'manifest'} href={'/site.webmanifest'} />
      <link rel={'mask-icon'} href={'/safari-pinned-tab.svg'} color={'#47B0FF'} />

      <meta name={'msapplication-TileColor'} content={'#47B0FF'} />
      <meta name={'msapplication-config'} content={'/browserconfig.xml'} />

      <meta name={'twitter:card'} content={'summary_large_image'} />
      <meta name={'twitter:site'} content={'@dotmind_io'} />
      <meta name={'twitter:creator'} content={'@dotmind_io'} />
      <meta name={'twitter:title'} content={t('common.name')} />
      <meta name={'twitter:description'} content={t('common.description')} />
      <meta name={'twitter:image'} content={'/assets/meta_image.jpg'} />

      <meta name={'color-scheme'} content={'light only'} />
    </Helmet>
  );
}

export default Head;
