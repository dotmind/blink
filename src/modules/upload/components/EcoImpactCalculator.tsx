import { useTranslation } from 'react-i18next';

import { useUpload } from '@/modules/upload/providers/UploadProvider';

const BASE_WEIGHT = 2.4; // gCO2e for 1Mo mail attachment
const RATIO = 48;

function EcoImpactCalculator(): JSX.Element {
  const { t } = useTranslation();
  const { fileWeight } = useUpload();

  const weightInMb: number = fileWeight / 1024 / 1024;
  const baseEcoImpact: number = Math.round(weightInMb * BASE_WEIGHT * 1000) / 1000;
  const newEcoImpact: number = Math.round(weightInMb * (BASE_WEIGHT / RATIO) * 1000) / 1000;
  const percentage: number = 100 - Math.round((newEcoImpact / baseEcoImpact) * 100);

  return (
    <p className={'text-center mt-2'}>
      {t('co2_impact.calculation.your_file')} &nbsp;
      <a href={'/calculation'} className={'text-blue pointer text-underline'} target={'_blank'} rel={'noreferrer'}>
        {newEcoImpact} g.CO2e
      </a>
      &nbsp;
      {t('co2_impact.calculation.compared_to')} &nbsp;
      <a href={'/calculation'} className={'text-blue pointer text-underline'} target={'_blank'} rel={'noreferrer'}>
        {percentage}%
      </a>
      &nbsp;
      {t('co2_impact.calculation.basic_mail')}
    </p>
  );
}

export default EcoImpactCalculator;
