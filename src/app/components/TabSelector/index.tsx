import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@/app/components/TabSelector/styles.module.scss';

interface IProps {
  children: React.ReactNode[];
  options: string[];
}

function TabSelector({ children, options }: IProps) {
  const [selected, setSelected] = useState<number>(0);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.tabContent}>
        {children.map((child, index) => {
          const isSelected = index === selected;
          return (
            <div key={options[index]} className={styles.tabs} data-visible={isSelected}>
              {child}
            </div>
          );
        })}
      </div>

      <div className={`${styles.tabSelector} my-2`}>
        {options.map((option, index) => {
          const isCurrent = index === selected;
          return (
            <button
              key={`toggle-${option.toString()}`}
              data-current={isCurrent}
              type={'button'}
              className={styles.tab}
              onClick={() => setSelected(index)}>
              {t(option)}
            </button>
          );
        })}
        <span className={styles.tabCurrent} data-position={selected} />
      </div>
    </>
  );
}

export default TabSelector;
