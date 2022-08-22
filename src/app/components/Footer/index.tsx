import LangSwitcher from '@/app/components/LangSwitcher';

import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.watermark}>Made by Dotmind</p>

      <LangSwitcher />
    </footer>
  );
}

export default Footer;
