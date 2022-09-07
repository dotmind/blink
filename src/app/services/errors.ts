import i18next from 'i18next';

export function handleError(error: Error): string {
  switch (error.message) {
    case 'TypeError: Failed to fetch':
      return i18next.t('common.errors.Network');
    case 'TypeError: Load failed':
      return i18next.t('common.errors.Network');
    case 'API: Not Found':
      return i18next.t('common.errors.ApiNotFound');
    case "API: I'm a teapot":
      return i18next.t('common.errors.ApiTeapot');
    case 'Invalid time value':
      return i18next.t('common.errors.InvalidTimeValue');
    case "undefined is not an object (evaluating 'window.crypto.subtle.generateKey')":
      return i18next.t('common.errors.Https');
    default:
      return i18next.t('common.errors.Unknown');
  }
}
