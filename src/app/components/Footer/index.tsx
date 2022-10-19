import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsSmallDevice } from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';

import styles from '@/app/components/Footer/styles.module.scss';

interface IProps {
  children?: ReactNode;
}

function Footer({ children }: IProps): JSX.Element {
  const isSmallDevice = useIsSmallDevice();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <a href={'https://dotmind.io/'} target={'_blank'} rel={'noreferrer'} className={styles.watermark}>
        {isSmallDevice ? '.mind' : t('common.watermark')}
      </a>

      <div className={styles.footer_cta}>
        {children}
        <LangSwitcher />
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  children: null,
};

export default Footer;
