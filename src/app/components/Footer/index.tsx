import { useMemo, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { usePwa } from '@dotmind/react-use-pwa';
import { useTranslation } from 'react-i18next';

import useIsMobile from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

interface IProps {
  children?: ReactNode;
}

function Footer({ children }: IProps) {
  const { isStandalone } = usePwa();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const canRenderMoreInfo = useMemo(() => isMobile && !isStandalone, [isMobile, isStandalone]);
  const hasFadeBkg = useMemo(() => pathname !== '/' || isStandalone, [pathname, isStandalone]);

  return (
    <footer className={styles.footer} data-hasfadebkg={hasFadeBkg}>
      <a href={'https://dotmind.io/'} target={'_blank'} rel={'noreferrer'} className={styles.watermark}>
        {t('common.watermark')}
      </a>

      <div className={styles.footer_cta}>
        {children}
        <LangSwitcher />
        {canRenderMoreInfo && <MoreInfo />}
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  children: null,
};

export default Footer;
