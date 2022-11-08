import { useMemo, useCallback } from 'react';

import styles from '@/app/components/EcoImpactTable/styles.module.scss';

interface IProps {
  datacenters: number;
  transmission: number;
  devices: number;
}

function EcoImpactTable({ datacenters, transmission, devices }: IProps): JSX.Element {
  const total = useMemo(() => datacenters + transmission + devices, [datacenters, transmission, devices]);
  const getPercentage = useCallback((value: number) => Math.round((value / total) * 10000) / 100, [total]);

  return (
    <table className={styles.impactTable}>
      <tbody>
        <tr>
          <th>Data centers</th>
          <td>{getPercentage(datacenters)} %</td>
          <td>{datacenters.toFixed(2)} g CO2e</td>
        </tr>
        <tr>
          <th>Transmission</th>
          <td>{getPercentage(transmission)} %</td>
          <td>{transmission.toFixed(2)} g CO2e</td>
        </tr>
        <tr>
          <th>Devices</th>
          <td>{getPercentage(devices)} %</td>
          <td>{devices.toFixed(2)} g CO2e</td>
        </tr>
        <tr>
          <th>Total</th>
          <td />
          <td>{total.toFixed(2)} g CO2e</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EcoImpactTable;
