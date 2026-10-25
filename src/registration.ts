import { storage } from './storage';

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
};

export const REGISTRATION_STORAGE_KEY = 'cadastro_atual';

export { storage };

const isRegistration = (value: unknown): value is Registration => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const registration = value as Record<string, unknown>;
  return (
    typeof registration.id === 'string' &&
    typeof registration.name === 'string' &&
    typeof registration.email === 'string' &&
    typeof registration.phone === 'string' &&
    typeof registration.password === 'string' &&
    typeof registration.createdAt === 'string'
  );
};

export const loadRegistration = (): Registration | null => {
  const saved = storage.getString(REGISTRATION_STORAGE_KEY);
  if (!saved) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(saved);
  } catch (error) {
    console.error('Não foi possível ler o cadastro salvo: o JSON está inválido.', error);
    return null;
  }

  if (!isRegistration(parsed)) {
    console.error('O cadastro salvo não possui o formato esperado.');
    return null;
  }

  return parsed;
};
