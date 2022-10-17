import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@/app/components/TabSelector/styles.module.scss';

interface IProps {
  children: React.ReactNode[];
  options: string[];
}

function TabSelector({ children, options }: IProps): JSX.Element {
  const [selected, setSelected] = useState<number>(1);
  const { t } = useTranslation();

  const toggles = useRef<HTMLButtonElement[]>([]);
  const tabsTracker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tracker = tabsTracker.current;
    const currentTab = toggles.current[selected];

    if (tracker && currentTab) {
      tracker.style.left = `${currentTab.offsetLeft}px`;
      tracker.style.width = `${currentTab.offsetWidth}px`;
      tracker.style.height = `${currentTab.offsetHeight}px`;
    }
  }, [selected]);

  return (
    <>
      <div className={styles.tabContent}>
        {children.map((child, index) => {
          const isSelected: boolean = index === selected;
          return (
            <div key={options[index]} className={styles.tabs} data-visible={isSelected}>
              {child}
            </div>
          );
        })}
      </div>

      <div className={`${styles.tabSelector} my-2`}>
        {options.map((option, index) => {
          const isCurrent: boolean = index === selected;
          return (
            <button
              key={`toggle-${option.toString()}`}
              data-current={isCurrent}
              type={'button'}
              className={styles.tab}
              onClick={() => setSelected(index)}
              ref={(el) => {
                if (el) {
                  toggles.current[index] = el;
                }
              }}>
              {t(option)}
            </button>
          );
        })}
        <span className={styles.tabTracker} ref={tabsTracker} />
      </div>
    </>
  );
}

export default TabSelector;
