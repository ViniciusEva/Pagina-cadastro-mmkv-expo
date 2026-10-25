import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';

import Cadastro from '@/screens/Cadastro';
import Confirmacao from '@/screens/Confirmacao';
import { loadRegistration, Registration } from '@/registration';

export default function Index() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRegistration(loadRegistration());
    setLoaded(true);
  }, []);

  const handleCadastrado = () => {
    setRegistration(loadRegistration());
  };

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <Text>Carregando cadastro...</Text>
      </View>
    );
  }

  return registration ? (
    <Confirmacao
      registration={registration}
      onNovoCadastro={() => setRegistration(null)}
    />
  ) : (
    <Cadastro onCadastrado={handleCadastrado} />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fb',
  },
});
