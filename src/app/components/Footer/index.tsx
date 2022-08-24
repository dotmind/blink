import useIsMobile from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className={styles.footer}>
      <p className={styles.watermark}>Made by Dotmind</p>

      {isMobile ? <MoreInfo /> : <LangSwitcher />}
    </footer>
  );
}

export default Footer;
