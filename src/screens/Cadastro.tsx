import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, Text } from '@rneui/themed';

import { REGISTRATION_STORAGE_KEY, storage } from '@/registration';

type CadastroProps = {
  onCadastrado: () => void;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

export default function Cadastro({ onCadastrado }: CadastroProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const phoneDigits = values.phone.replace(/\D/g, '');
    const password = values.password.trim();

    if (!name) {
      nextErrors.name = 'Informe seu nome.';
    }
    if (!email) {
      nextErrors.email = 'Informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!values.phone.trim()) {
      nextErrors.phone = 'Informe seu telefone.';
    } else if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone com pelo menos 10 dígitos.';
    }
    if (!password) {
      nextErrors.password = 'Informe sua senha.';
    } else if (password.length < 6) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    return nextErrors;
  };

  const handleCadastrar = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const registration = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      password: values.password,
      createdAt: new Date().toISOString(),
    };

    storage.set(REGISTRATION_STORAGE_KEY, JSON.stringify(registration));
    onCadastrado();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text h3 style={styles.title}>
          Cadastro
        </Text>
        <Text style={styles.subtitle}>
          Preencha seus dados para criar seu cadastro.
        </Text>

        <Input
          label="Nome"
          placeholder="Digite seu nome"
          value={values.name}
          onChangeText={(value) => updateValue('name', value)}
          leftIcon={<Icon name="person-outline" type="material" color="#667085" />}
          autoCapitalize="words"
          errorMessage={errors.name}
        />
        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={values.email}
          onChangeText={(value) => updateValue('email', value)}
          leftIcon={<Icon name="mail-outline" type="material" color="#667085" />}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          errorMessage={errors.email}
        />
        <Input
          label="Telefone"
          placeholder="Digite seu telefone"
          value={values.phone}
          onChangeText={(value) => updateValue('phone', value)}
          leftIcon={<Icon name="phone" type="material" color="#667085" />}
          keyboardType="phone-pad"
          errorMessage={errors.phone}
        />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          value={values.password}
          onChangeText={(value) => updateValue('password', value)}
          leftIcon={<Icon name="lock-outline" type="material" color="#667085" />}
          secureTextEntry
          autoCapitalize="none"
          errorMessage={errors.password}
        />

        <Button
          title="Cadastrar"
          onPress={handleCadastrar}
          buttonStyle={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    color: '#20243a',
  },
  subtitle: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 13,
    marginTop: 8,
  },
});
