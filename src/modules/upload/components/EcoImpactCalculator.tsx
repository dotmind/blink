import { useTranslation } from 'react-i18next';

import { useUpload } from '@/modules/upload/providers/UploadProvider';
import { BASE_WEIGHT, BLINK_WEIGHT } from '@/app/constants/eco_calcul';
import { getTotal } from '@/app/utils/eco_calcul';

function EcoImpactCalculator(): JSX.Element {
  const { t } = useTranslation();
  const { fileWeight } = useUpload();

  const weightInMb: number = fileWeight / 1024 / 1024;
  const baseEcoImpact: number = Math.round(weightInMb * getTotal(BASE_WEIGHT) * 1000) / 1000;
  const newEcoImpact: number =
    Math.round(weightInMb * (getTotal(BASE_WEIGHT) / (getTotal(BASE_WEIGHT) / getTotal(BLINK_WEIGHT))) * 1000) / 1000;
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
