import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePwa } from '@dotmind/react-use-pwa';
import { useLocation } from 'react-router';

import Button, { ButtonStyle } from '@/app/components/Button';
import useIsMobile from '@/app/hooks/useIsMobile';

import styles from '@/app/components/InstallPwa/styles.module.scss';

function InstallPwa(): JSX.Element | null {
  const { pathname } = useLocation();
  const isMobile: boolean = useIsMobile();
  const { isInstalled, isOffline, isStandalone, canInstall, installPrompt } = usePwa();
  const { t } = useTranslation();

  const handleInstallPrompt: () => void = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

  const canRender: boolean = useMemo(
    () => !isStandalone && !isInstalled && !isMobile && canInstall,
    [isStandalone, isInstalled, isMobile, canInstall],
  );

  const renderButton: JSX.Element | null = useMemo(() => {
    if (isOffline) {
      return <p>{t('common.pwa.offline')} 📶</p>;
    }

    if (!canRender) {
      return null;
    }

    return (
      <div className={styles.pwa_button} data-fullwidth={pathname !== '/'}>
        <Button style={ButtonStyle.WHITE} callback={handleInstallPrompt} name={t('common.pwa.install')}>
          {t('common.pwa.install')}
        </Button>
      </div>
    );
  }, [canRender, pathname, isOffline]);

  return renderButton;
}

export default InstallPwa;
