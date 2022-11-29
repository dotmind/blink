import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BASE_WEIGHT, BLINK_WEIGHT } from '@/app/constants/eco_calcul';
import { getTotal } from '@/app/utils/eco_calcul';
import styles from '@/app/components/EcoImpactTable/styles.module.scss';
import EcoTooltip from '@/app/components/EcoTooltip';

function EcoImpactTable(): JSX.Element {
  const { t } = useTranslation();

  const getPercentage = useCallback((value: number, total: number) => Math.round((value / total) * 10000) / 100, []);

  const baseInfo = useMemo(() => (
    <div className={styles.info}>
      <p>Pour une pièce jointe de <span>1 Mo</span></p>
      <p>Durée de rédaction du mail: <span>3 minutes</span></p>
      <p>Nombre de redondance coté émetteur: <span>3</span></p>
      <p>Nombre de redondance coté récepteur: <span>3</span></p>
      <p>Durée du stockage: <span>10 ans</span></p>
      <p>Nombre de mail reçu / envoyé par jour par personne: <span>100</span></p>
    </div>
  ), []);

  const blinkInfo = useMemo(() => (
    <div className={styles.info}>
      <p>Pour une pièce jointe de <span>1 Mo</span></p>
      <p>Durée d&#39;envoie d&#39;un fichier blink: <span>1 minute</span></p>
      <p>Nombre de redondance coté émetteur: <span>1</span></p>
      <p>Nombre de redondance coté récepteur: <span>0</span></p>
      <p>Durée du stockage: <span>0.0384 ans (14 jours)</span></p>
      <p>Nombre de mail reçu / envoyé par jour par personne: <span>100</span></p>
    </div>
  ), []);

  return (
    <table className={styles.impactTable}>
      <tbody>
        <tr>
          <th> </th>
          <th colSpan={2}>
            {t('co2_impact.table.titles.without_blink')}
            <EcoTooltip>{baseInfo}</EcoTooltip>
          </th>
          <th colSpan={2}>
            {t('co2_impact.table.titles.with_blink')}
            <EcoTooltip>{blinkInfo}</EcoTooltip>
          </th>
        </tr>

        <tr>
          <th>{t('co2_impact.table.titles.data_center')}</th>
          <td>
            <div>{getPercentage(BASE_WEIGHT.datacenters, getTotal(BASE_WEIGHT))} %</div>
            <div>{BASE_WEIGHT.datacenters.toFixed(2)} g CO2e</div>
          </td>
          <td>
            <div>{getPercentage(BLINK_WEIGHT.datacenters, getTotal(BLINK_WEIGHT))} %</div>
            <div>{BLINK_WEIGHT.datacenters.toFixed(2)} g CO2e</div>
          </td>
        </tr>
        <tr>
          <th>{t('co2_impact.table.titles.transmission')}</th>
          <td>
            <div>{getPercentage(BASE_WEIGHT.transmission, getTotal(BASE_WEIGHT))} %</div>
            <div>{BASE_WEIGHT.transmission.toFixed(2)} g CO2e</div>
          </td>
          <td>
            <div>{getPercentage(BLINK_WEIGHT.transmission, getTotal(BLINK_WEIGHT))} %</div>
            <div>{BLINK_WEIGHT.transmission.toFixed(2)} g CO2e</div>
          </td>
        </tr>
        <tr>
          <th>{t('co2_impact.table.titles.devices')}</th>
          <td>
            <div>{getPercentage(BASE_WEIGHT.devices, getTotal(BASE_WEIGHT))} %</div>
            <div>{BASE_WEIGHT.devices.toFixed(2)} g CO2e</div>
          </td>
          <td>
            <div>{getPercentage(BLINK_WEIGHT.devices, getTotal(BLINK_WEIGHT))} %</div>
            <div>{BLINK_WEIGHT.devices.toFixed(2)} g CO2e</div>
          </td>
        </tr>
        <tr>
          <th>{t('co2_impact.table.titles.total')}</th>
          <td colSpan={2}>{getTotal(BASE_WEIGHT).toFixed(2)} g CO2e</td>
          <td colSpan={2}>{getTotal(BLINK_WEIGHT).toFixed(2)} g CO2e</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EcoImpactTable;
