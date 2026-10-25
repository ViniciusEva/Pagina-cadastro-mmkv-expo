import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Icon, ListItem, Text } from '@rneui/themed';

import { Registration } from '@/registration';

type ConfirmacaoProps = {
  registration: Registration;
  onNovoCadastro: () => void;
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase())
    .join('');

export default function Confirmacao({
  registration,
  onNovoCadastro,
}: ConfirmacaoProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Avatar
          title={getInitials(registration.name)}
          rounded
          size={76}
          containerStyle={styles.avatar}
        />
        <Text h3 style={styles.successTitle}>
          Cadastro realizado!
        </Text>
        <Text style={styles.subtitle}>
          Seus dados foram salvos com sucesso.
        </Text>

        <Card containerStyle={styles.card}>
          <Card.Title>Dados cadastrados</Card.Title>
          <Card.Divider />
          <ListItem bottomDivider>
            <Icon name="person-outline" type="material" color="#667085" />
            <ListItem.Content>
              <ListItem.Title>{registration.name}</ListItem.Title>
              <ListItem.Subtitle>Nome</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="mail-outline" type="material" color="#667085" />
            <ListItem.Content>
              <ListItem.Title>{registration.email}</ListItem.Title>
              <ListItem.Subtitle>E-mail</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="phone" type="material" color="#667085" />
            <ListItem.Content>
              <ListItem.Title>{registration.phone}</ListItem.Title>
              <ListItem.Subtitle>Telefone</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <Icon name="event" type="material" color="#667085" />
            <ListItem.Content>
              <ListItem.Title>
                {new Date(registration.createdAt).toLocaleString('pt-BR')}
              </ListItem.Title>
              <ListItem.Subtitle>Data do cadastro</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>

        <Button
          title="Novo cadastro"
          type="outline"
          onPress={onNovoCadastro}
          buttonStyle={styles.newButton}
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
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    backgroundColor: '#2089dc',
    marginTop: 4,
  },
  successTitle: {
    color: '#26934a',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#e4e7ec',
    marginHorizontal: 0,
  },
  newButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginTop: 12,
  },
});
