import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { usePwa } from '@dotmind/react-use-pwa';

import useIsMobile from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

function Footer() {
  const { isStandalone } = usePwa();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  const canRenderMoreInfo = useMemo(() => isMobile && !isStandalone, [isMobile, isStandalone]);
  const isFullWidth = useMemo(() => pathname === '/' || isStandalone, [pathname, isStandalone]);

  return (
    <footer className={styles.footer} data-fullwidth={isFullWidth}>
      <a href={'https://dotmind.io/'} target={'_blank'} rel={'noreferrer'} className={styles.watermark}>
        Made by Dotmind
      </a>

      <LangSwitcher />
      {canRenderMoreInfo && <MoreInfo />}
    </footer>
  );
}

export default Footer;
