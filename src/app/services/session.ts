import { load } from '@fingerprintjs/fingerprintjs';

export async function createFingerprint() {
  const fp = await load();
  const { visitorId } = await fp.get();

  return visitorId;
}
