import { useMemo } from 'react';

import useWindowSize from '@/app/hooks/useWindowSize';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

function Footer() {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < 768, [width]);

  return (
    <footer className={styles.footer}>
      <p className={styles.watermark}>Made by Dotmind</p>

      {isMobile ? <MoreInfo /> : <LangSwitcher />}
    </footer>
  );
}

export default Footer;
