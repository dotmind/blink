import { useState, useRef, useEffect, Suspense, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import useWindowSize from '@/app/hooks/useWindowSize';
import { useElementSize } from '@/app/hooks/useElementSize';
import Loader from '@/app/components/Loader';

import styles from '@/app/components/TabSelector/styles.module.scss';

interface IProps {
  children: ReactNode[];
  options: string[];
}

function TabSelector({ children, options }: IProps): JSX.Element {
  const [selected, setSelected] = useState<number>(1);
  const tabMounted = useRef<number[]>([]);
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const toggles = useRef<HTMLButtonElement[]>([]);
  const tabsTracker = useRef<HTMLDivElement>(null);
  const { ref: label, width: labelWidth } = useElementSize();

  useEffect(() => {
    const tracker: HTMLElement | null = tabsTracker.current;

    if (tracker && toggles.current[selected]) {
      const selectedOne = toggles.current[selected];

      tracker.style.left = `${selectedOne.offsetLeft}px`;
      tracker.style.width = `${selectedOne.offsetWidth}px`;
      tracker.style.height = `${selectedOne.offsetHeight}px`;
    }
  }, [selected, labelWidth, width]);

  const renderTabContent = () =>
    children.map((child, index) => {
      const isSelected: boolean = index === selected;
      const isTabMounted = (tabIndex: number): boolean => tabMounted.current.includes(tabIndex);

      const renderChild = () => {
        if (isSelected) {
          if (!isTabMounted(selected)) {
            tabMounted.current.push(selected);
          }

          return child;
        }

        if (isTabMounted(index)) {
          return child;
        }

        return null;
      };

      return (
        <div key={options[index]} className={styles.tabs} data-visible={isSelected}>
          <Suspense fallback={<Loader />}>{renderChild()}</Suspense>
        </div>
      );
    });

  return (
    <>
      <div className={styles.tabContent}>{renderTabContent()}</div>

      <div className={`${styles.tabSelector}`}>
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
                  if (index === 1) label.current = el;
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
