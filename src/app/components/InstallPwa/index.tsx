import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePwa } from '@dotmind/react-use-pwa';

import styles from '@/app/components/InstallPwa/styles.module.scss';

function InstallPwa() {
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

  if (!isStandalone && !isInstalled) {
    return (
      <button className={styles.pwa_button} type={'button'} onClick={handleInstallPrompt}>
        {t('common.pwa.install')}
      </button>
    );
  }

  return null;
}

export default InstallPwa;
