import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpload, UploadStatus } from '@/modules/upload/providers/UploadProvider';
import EcoImpactCalculator from '@/modules/upload/components/EcoImpactCalculator';

function HomeTitles() {
  const { t } = useTranslation();
  const { status } = useUpload();

  const render = useMemo(() => {
    if (status === UploadStatus.SUCCESS) {
      return (
        <>
          <h1>{t('home.elon_musk')}</h1>
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
