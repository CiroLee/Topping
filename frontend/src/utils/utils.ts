import { getPlatformType } from 'utils-gear';
export function isMac() {
  return getPlatformType(window.navigator.userAgent) === 'macOS';
}
