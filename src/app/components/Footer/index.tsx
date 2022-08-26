import { useLocation } from 'react-router';

import useIsMobile from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

function Footer() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <footer className={styles.footer} data-fullwidth={pathname !== '/'}>
      <a href={'https://dotmind.io/'} target={'_blank'} rel={'noreferrer'} className={styles.watermark}>
        Made by Dotmind
      </a>

      {isMobile ? <MoreInfo /> : <LangSwitcher />}
    </footer>
  );
}

export default Footer;
