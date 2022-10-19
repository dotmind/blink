import { useMemo, ReactNode } from 'react';
import { usePwa } from '@dotmind/react-use-pwa';
import { useTranslation } from 'react-i18next';

import useIsMobile, { useIsSmallDevice } from '@/app/hooks/useIsMobile';
import LangSwitcher from '@/app/components/LangSwitcher';
import MoreInfo from '@/app/components/MoreInfo';

import styles from '@/app/components/Footer/styles.module.scss';

interface IProps {
  children?: ReactNode;
}

function Footer({ children }: IProps): JSX.Element {
  const { isStandalone } = usePwa();
  const isMobile = useIsMobile();
  const isSmallDevice = useIsSmallDevice();
  const { t } = useTranslation();

  const canRenderMoreInfo = useMemo((): boolean => isMobile && !isStandalone, [isMobile, isStandalone]);

  return (
    <footer className={styles.footer}>
      <a href={'https://dotmind.io/'} target={'_blank'} rel={'noreferrer'} className={styles.watermark}>
        {isSmallDevice ? '.mind' : t('common.watermark')}
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
