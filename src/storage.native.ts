import { createMMKV } from 'react-native-mmkv';

const storageInstance = createMMKV({ id: 'cadastro-rne-storage' });

export const storage = {
  set: (key: string, value: string) => storageInstance.set(key, value),
  getString: (key: string): string | undefined => storageInstance.getString(key),
  delete: (key: string) => storageInstance.remove(key),
};
