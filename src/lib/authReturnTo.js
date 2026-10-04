const RETURN_TO_KEY = 'base44_return_to';

export function setReturnTo(path) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(RETURN_TO_KEY, path);
  } catch (e) {
    // ignore
  }
}

export function getReturnTo() {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(RETURN_TO_KEY);
  } catch (e) {
    return null;
  }
}

export function clearReturnTo() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(RETURN_TO_KEY);
  } catch (e) {
    // ignore
  }
}

export function consumeReturnTo(defaultPath = '/') {
  const path = getReturnTo();
  clearReturnTo();
  return path || defaultPath;
}
