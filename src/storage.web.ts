const getBrowserStorage = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return window.localStorage;
};

export const storage = {
  set: (key: string, value: string) => {
    const browserStorage = getBrowserStorage();
    if (!browserStorage) {
      throw new Error('O armazenamento do navegador está indisponível.');
    }
    browserStorage.setItem(key, value);
  },
  getString: (key: string): string | undefined =>
    getBrowserStorage()?.getItem(key) ?? undefined,
  delete: (key: string) => {
    const browserStorage = getBrowserStorage();
    if (!browserStorage) {
      throw new Error('O armazenamento do navegador está indisponível.');
    }
    browserStorage.removeItem(key);
  },
};
