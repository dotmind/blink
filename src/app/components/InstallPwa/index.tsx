import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePwa } from '@dotmind/react-use-pwa';
import { useLocation } from 'react-router';

import Button, { ButtonStyle } from '@/app/components/Button';
import useIsMobile from '@/app/hooks/useIsMobile';

import styles from '@/app/components/InstallPwa/styles.module.scss';

function InstallPwa() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const { isInstalled, isOffline, isStandalone, canInstall, installPrompt } = usePwa();
  const { t } = useTranslation();

  const handleInstallPrompt = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

  if (isOffline) {
    return <p>{t('common.pwa.offline')} 📶</p>;
  }

  // @TODO: isInstalled not working & always return false
  if (!isStandalone && !isInstalled && !isMobile) {
    return (
      <div className={styles.pwa_button} data-fullwidth={pathname !== '/'}>
        <Button style={ButtonStyle.WHITE} callback={handleInstallPrompt} name={t('common.pwa.install')}>
          {t('common.pwa.install')}
        </Button>
      </div>
    );
  }

  return null;
}

export default InstallPwa;
