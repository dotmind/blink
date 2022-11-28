import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { BASE_WEIGHT, BLINK_WEIGHT } from '@/app/constants/eco_calcul';
import { getTotal } from '@/app/utils/eco_calcul';

import styles from '@/app/components/EcoImpactTable/styles.module.scss';

function EcoImpactTable(): JSX.Element {
  const { t } = useTranslation();

  const getPercentage = useCallback((value: number, total: number) => Math.round((value / total) * 10000) / 100, []);

  return (
    <table className={styles.impactTable}>
      <tr>
        <th> </th>
        <th colSpan={2}>{t('co2_impact.table.titles.without_blink')}</th>
        <th colSpan={2}>{t('co2_impact.table.titles.with_blink')}</th>
      </tr>
      <tr>
        <th>{t('co2_impact.table.titles.data_center')}</th>
        <div>
          <td>{getPercentage(BASE_WEIGHT.datacenters, getTotal(BASE_WEIGHT))} %</td>
          <td>{BASE_WEIGHT.datacenters.toFixed(2)} g CO2e</td>
        </div>
        <div>
          <td>{getPercentage(BLINK_WEIGHT.datacenters, getTotal(BLINK_WEIGHT))} %</td>
          <td>{BLINK_WEIGHT.datacenters.toFixed(2)} g CO2e</td>
        </div>
      </tr>
      <tr>
        <th>{t('co2_impact.table.titles.transmission')}</th>
        <div>
          <td>{getPercentage(BASE_WEIGHT.transmission, getTotal(BASE_WEIGHT))} %</td>
          <td>{BASE_WEIGHT.transmission.toFixed(2)} g CO2e</td>
        </div>
        <div>
          <td>{getPercentage(BLINK_WEIGHT.transmission, getTotal(BLINK_WEIGHT))} %</td>
          <td>{BLINK_WEIGHT.transmission.toFixed(2)} g CO2e</td>
        </div>
      </tr>
      <tr>
        <th>{t('co2_impact.table.titles.devices')}</th>
        <div>
          <td>{getPercentage(BASE_WEIGHT.devices, getTotal(BASE_WEIGHT))} %</td>
          <td>{BASE_WEIGHT.devices.toFixed(2)} g CO2e</td>
        </div>
        <div>
          <td>{getPercentage(BLINK_WEIGHT.devices, getTotal(BLINK_WEIGHT))} %</td>
          <td>{BLINK_WEIGHT.devices.toFixed(2)} g CO2e</td>
        </div>
      </tr>
      <tr>
        <th>{t('co2_impact.table.titles.total')}</th>
        <td colSpan={2}>{getTotal(BASE_WEIGHT).toFixed(2)} g CO2e</td>
        <td colSpan={2}>{getTotal(BLINK_WEIGHT).toFixed(2)} g CO2e</td>
      </tr>
    </table>
  );
}

export default EcoImpactTable;
