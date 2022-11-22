import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import EcoImpactCalculator from '@/modules/upload/components/EcoImpactCalculator';

const TITLES: string[] = ['elon_musk'];

function HomeTitles() {
  const { t } = useTranslation();
  const { status } = useUpload();

  const rdmTitle = useMemo(() => TITLES[Math.floor(Math.random() * TITLES.length)], []);

  const render = useMemo(() => {
    if (status === UploadStatus.UPLOADING || status === UploadStatus.SUCCESS) {
      return (
        <>
          <h1>{t(`home.success.${rdmTitle}`)}</h1>
          <EcoImpactCalculator />
        </>
      );
    }

    return (
      <>
        <h1 className={'title'}> {t('home.title')} </h1>
        <p className={'subtitle'}> {t('home.subtitle')} </p>
      </>
    );
  }, [t, status]);

  return <div className={'safe text-center'}>{render}</div>;
}

export default HomeTitles;
