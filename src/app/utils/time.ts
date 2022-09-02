import i18next from 'i18next';

// Display time remain in smallest unit
export function timeRemaining(expiresAt: string | number): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires.getTime() - now.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);

  if (seconds < 60) {
    return `${seconds} ${i18next.t('time.seconds')}`;
  }

  if (minutes < 60) {
    return `${minutes} ${i18next.t('time.minutes')}`;
  }

  if (hours < 24) {
    return `${hours} ${i18next.t('time.hours')}`;
  }

  if (days < 30) {
    return `${days} ${i18next.t('time.days')}`;
  }

  if (months < 12) {
    return `${months} ${i18next.t('time.months')}`;
  }

  return `${years} ${i18next.t('time.years')}`;
}
