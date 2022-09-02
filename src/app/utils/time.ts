// Display time remain in smallest unit
export function timeRemaining(expiresAt: string | number): { time: number; unit: string } {
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
    return { time: seconds, unit: 'time.seconds' };
  }

  if (minutes < 60) {
    return { time: minutes, unit: 'time.minutes' };
  }

  if (hours < 24) {
    return { time: hours, unit: 'time.hours' };
  }

  if (days < 30) {
    return { time: days, unit: 'time.days' };
  }

  if (months < 12) {
    return { time: months, unit: 'time.months' };
  }

  return { time: years, unit: 'time.years' };
}
