# Cadastro RNE + MMKV

Aplicativo de cadastro desenvolvido com React Native, Expo e React Native Elements (RNEUI). O formulário coleta nome, e-mail, telefone e senha, valida os campos, grava um cadastro e apresenta uma tela de confirmação.

O projeto oferece armazenamento persistente nas duas plataformas:

- **Android/iOS:** MMKV, por meio de `react-native-mmkv`.
- **Web:** Local Storage do navegador. O MMKV depende de código nativo e não funciona no navegador; por isso, a implementação web mantém a mesma interface de armazenamento usando `localStorage`.

> **Importante:** o cadastro é um exercício didático. A senha é guardada como parte do objeto JSON para atender ao exercício, embora não apareça na confirmação. Não armazene senhas em texto puro em um aplicativo de produção.

## Sumário

- [Requisitos](#requisitos)
- [Estrutura do workspace](#estrutura-do-workspace)
- [Instalação](#instalação)
- [Como executar](#como-executar)
- [Wireframe e fluxo](#wireframe-e-fluxo)
- [Validações](#validações)
- [Armazenamento e persistência](#armazenamento-e-persistência)
- [Bibliotecas principais](#bibliotecas-principais)
- [Comandos úteis](#comandos-úteis)
- [Problemas comuns](#problemas-comuns)
- [Limitações conhecidas](#limitações-conhecidas)

## Requisitos

- Node.js LTS e npm.
- VS Code ou outro editor.
- Navegador atualizado para executar a versão web.
- Para executar em Android/iOS com MMKV: ambiente de desenvolvimento nativo configurado, como Android Studio/SDK para Android ou Xcode no macOS para iOS.

Confira as versões instaladas:

```powershell
node --version
npm --version
```

## Estrutura do workspace

O workspace tem uma pasta externa e o projeto Expo dentro dela. É importante iniciar a aplicação a partir do projeto interno.

```text
meu-projeto-mmkv/                    # Workspace externo
├── package.json                     # Atalhos para os scripts do app interno
├── package-lock.json                # Lockfile do workspace externo
└── meu-projeto-mmkv/                # Raiz real do projeto Expo
    ├── .npmrc                       # Configuração de resolução de peer dependencies do npm
    ├── app.json                     # Configuração do Expo
    ├── package.json                 # Dependências e scripts do aplicativo
    ├── package-lock.json            # Lockfile do aplicativo
    ├── src/
    │   ├── app/
    │   │   ├── _layout.tsx          # Layout Expo Router e tema do RNEUI
    │   │   ├── index.tsx            # Inicialização e seleção da tela atual
    │   │   └── explore.tsx          # Rota de exemplo do template Expo
    │   ├── screens/
    │   │   ├── Cadastro.tsx         # Formulário e validação
    │   │   └── Confirmacao.tsx      # Exibição dos dados salvos
    │   ├── registration.ts          # Tipo, chave e leitura do cadastro persistido
    │   ├── storage.ts               # Export padrão da implementação nativa
    │   ├── storage.native.ts        # Adaptador MMKV para Android/iOS
    │   ├── storage.web.ts           # Adaptador Local Storage para web
    │   ├── components/              # Componentes reutilizados do template
    │   ├── constants/               # Constantes de estilo do template
    │   └── hooks/                   # Hooks do template
    ├── assets/                      # Imagens, ícones e fontes
    ├── scripts/                     # Scripts auxiliares do projeto
    └── tsconfig.json                # Configuração TypeScript
```

### Qual pasta devo abrir?

Abra a pasta externa `meu-projeto-mmkv` no VS Code para usar os atalhos convenientes `npm run web`, `npm run android` e `npm run ios`.

O app Expo está na subpasta `meu-projeto-mmkv`. Os comandos da pasta externa encaminham as tarefas para ela. Se preferir trabalhar diretamente na pasta interna, os mesmos scripts Expo estão disponíveis ali.

Não inicie `npx expo start` na pasta externa: ela não contém as rotas `src/app` nem a configuração `main: "expo-router/entry"` do aplicativo. Iniciar o Expo no lugar errado pode fazer o bundler procurar um `App` que não existe.

## Instalação

### Instalar as dependências do aplicativo

No PowerShell, a partir da pasta externa:

```powershell
cd .\meu-projeto-mmkv
npm install
```

Ou, se já estiver na pasta interna do projeto Expo:

```powershell
npm install
```

O `package-lock.json` fixa as versões resolvidas. Prefira `npm install` em vez de apagar o lockfile ou instalar versões arbitrárias.

### Bibliotecas principais instaladas

As dependências já estão declaradas no `package.json`; normalmente basta executar `npm install`.

| Biblioteca | Uso |
|---|---|
| `expo` | Ferramentas e execução do aplicativo Expo. |
| `expo-router` | Rotas baseadas nos arquivos em `src/app`. |
| `react` e `react-native` | Interface e lógica da aplicação. |
| `@rneui/themed` | Componentes temáticos, como `Text`, `Input`, `Button`, `Card`, `Avatar` e `ListItem`. |
| `@rneui/base` | Componentes-base usados pelo RNEUI. |
| `@react-native-vector-icons/material-icons` | Ícones Material usados nos campos e na confirmação. |
| `react-native-mmkv` | Persistência síncrona nativa com MMKV. |
| `react-native-nitro-modules` | Runtime nativo necessário ao MMKV v4. |
| `react-native-web` e `react-dom` | Renderização da interface no navegador. |
| `typescript` e `@types/react` | Tipagem TypeScript e tipos React. |

O `.npmrc` da pasta do aplicativo configura `legacy-peer-deps=true` devido a dependências peer opcionais de teste incompatíveis entre a versão instalada do Expo Router e o React Native Elements. O ajuste é aplicado apenas às operações npm executadas a partir do projeto interno.

## Como executar

### Web — recomendado para este exercício

Abra um terminal na pasta externa do workspace e execute:

```powershell
npm run web
```

O comando inicia o Expo na pasta interna do projeto. O terminal mostrará o endereço local — geralmente `http://localhost:8081`. Se essa porta estiver ocupada, o Expo selecionará outra, como `8082`; abra o endereço exibido no terminal.

Também é possível iniciar diretamente da pasta interna:

```powershell
cd .\meu-projeto-mmkv
npm run web
```

Para limpar o cache do Metro quando necessário:

```powershell
cd .\meu-projeto-mmkv
npx expo start --web --clear
```

Para encerrar o servidor, volte ao terminal em que ele está rodando e pressione **Ctrl+C**.

### Android

Para iniciar o Expo apontando para um emulador Android:

```powershell
npm run android
```

Para compilar e executar um development build com o módulo nativo MMKV:

```powershell
cd .\meu-projeto-mmkv
npx expo run:android
```

É necessário ter o Android Studio, o Android SDK e um emulador ou dispositivo configurado. O primeiro build pode demorar.

### iOS

No macOS, com Xcode instalado, o Expo pode ser iniciado com:

```bash
npm run ios
```

Para compilar um development build com MMKV:

```bash
cd meu-projeto-mmkv
npx expo run:ios
```

O desenvolvimento/compilação de iOS nativo requer macOS e Xcode.

> **Expo Go:** MMKV depende de código nativo. O aplicativo não funciona no Expo Go padrão; para Android/iOS, use um development build que inclua o MMKV. A versão web, por sua vez, usa Local Storage.

## Wireframe e fluxo

Representação textual das duas telas:

```text
┌──────────────────────────────────────┐
│ Cadastro                             │
│ Preencha seus dados                  │
│                                      │
│ [ícone] Nome                         │
│ [ícone] E-mail                       │
│ [ícone] Telefone                     │
│ [ícone] Senha                        │
│                                      │
│             [ Cadastrar ]            │
└──────────────────────────────────────┘
                  │
                  │ valida os campos e salva o JSON
                  ▼
┌──────────────────────────────────────┐
│                  MS                  │
│         Cadastro realizado!          │
│                                      │
│ Dados cadastrados                    │
│ Nome              Maria Souza        │
│ E-mail            maria@email.com    │
│ Telefone          (11) 91234-5678    │
│ Data do cadastro  ...                │
│                                      │
│           [ Novo cadastro ]          │
└──────────────────────────────────────┘
```

1. Ao abrir, `src/app/index.tsx` lê o cadastro persistido.
2. Se não houver cadastro válido, exibe `Cadastro`.
3. Ao tocar em **Cadastrar**, valida os campos. Erros aparecem no próprio `Input` por meio de `errorMessage`.
4. Se os dados forem válidos, cria um objeto com `id` e `createdAt`, serializa com `JSON.stringify` e grava na chave `cadastro_atual`.
5. O app relê o cadastro do armazenamento e exibe `Confirmacao`.
6. A tela de confirmação apresenta nome, e-mail, telefone e data; não apresenta a senha.
7. **Novo cadastro** volta ao formulário vazio. O cadastro anteriormente persistido permanece até que outro cadastro válido o substitua. Assim, se a página for recarregada antes de salvar o novo cadastro, o anterior voltará a ser exibido.

## Validações

| Campo | Regra |
|---|---|
| Nome | Obrigatório; espaços em branco não contam como conteúdo. |
| E-mail | Obrigatório e deve corresponder a um formato básico de e-mail válido. |
| Telefone | Obrigatório e deve conter pelo menos 10 dígitos; a contagem ignora pontuação, espaços e outros caracteres não numéricos. |
| Senha | Obrigatória e deve ter pelo menos 6 caracteres. A senha é ocultada no campo e não é exibida na confirmação. |

As mensagens de validação são passadas à propriedade `errorMessage` do componente `Input` do React Native Elements.

## Armazenamento e persistência

O objeto é serializado como JSON na chave:

```text
cadastro_atual
```

Formato ilustrativo:

```json
{
  "id": "identificador-gerado",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "phone": "(11) 91234-5678",
  "password": "senha-do-exercicio",
  "createdAt": "2026-10-25T13:00:00.000Z"
}
```

- `src/registration.ts` define o tipo `Registration`, a chave e `loadRegistration()`. A leitura usa `storage.getString('cadastro_atual')` sem `await`, pois a interface do armazenamento é síncrona.
- `src/storage.native.ts` usa `createMMKV({ id: 'cadastro-rne-storage' })` e os métodos síncronos de MMKV no Android/iOS.
- `src/storage.web.ts` usa `window.localStorage` no navegador e não tenta importar o módulo nativo.
- `src/storage.ts` é a entrada padrão para a implementação nativa. O Metro escolhe automaticamente `storage.web.ts` para web e `storage.native.ts` para plataformas nativas quando o código importa `@/storage`.

No navegador, os dados ficam vinculados à origem (host, protocolo e porta). Por exemplo, `localhost:8081` e `localhost:8082` têm Local Storage separado. Recarregar a mesma origem mantém o último cadastro salvo.

## Bibliotecas principais

Para adicionar novamente as principais bibliotecas ao app interno, execute:

```powershell
cd .\meu-projeto-mmkv
npm install @rneui/themed @rneui/base @react-native-vector-icons/material-icons react-native-mmkv react-native-nitro-modules
```

Se também precisar das declarações de tipos do pacote de ícones usado pelo RNEUI:

```powershell
npm install --save-dev @types/react-native-vector-icons
```

Após alterar dependências nativas, pare o servidor Expo e inicie-o novamente. Para Android/iOS, recompile o development build para incluir os módulos nativos.

## Comandos úteis

| Comando | Onde executar | Finalidade |
|---|---|---|
| `npm install` | Pasta interna | Instalar dependências do app conforme o lockfile. |
| `npm run web` | Pasta externa ou interna | Iniciar a aplicação web. |
| `npm run start` | Pasta externa ou interna | Iniciar o Expo sem escolher uma plataforma. |
| `npm run android` | Pasta externa ou interna | Iniciar o Expo para Android. |
| `npm run ios` | Pasta externa ou interna | Iniciar o Expo para iOS (macOS). |
| `npx expo start --web --clear` | Pasta interna | Limpar o cache e iniciar a versão web. |
| `npx expo export --platform web` | Pasta interna | Gerar o bundle web e verificar se a aplicação empacota. |
| `npx tsc --noEmit` | Pasta interna | Verificar tipos TypeScript sem gerar arquivos. |
| `npx expo run:android` | Pasta interna | Compilar/iniciar um development build Android. |
| `npx expo run:ios` | Pasta interna, macOS | Compilar/iniciar um development build iOS. |

## Problemas comuns

### `Unable to resolve "../../App" from "node_modules/expo/AppEntry.js"`

**Causa provável:** o Expo foi iniciado na pasta externa, que não contém o app nem a configuração Expo Router.

**Solução:** encerre o servidor com **Ctrl+C** e execute `npm run web` na pasta externa, ou entre na pasta interna `.\meu-projeto-mmkv` e rode `npm run web`. Não use `npx expo start` na pasta externa.

### Tela branca ou página que parece não atualizar

1. Confira os logs do terminal onde o Expo está rodando.
2. Abra o endereço exato que o Expo informou. Se a porta mudou de `8081` para `8082`, atualize a página na porta nova.
3. Pare servidores Expo antigos com **Ctrl+C** para evitar abrir uma instância antiga.
4. Limpe o cache a partir da pasta interna:

   ```powershell
   npx expo start --web --clear
   ```

5. Verifique o console do navegador (F12) para erros JavaScript.

### `Unable to resolve "nome-do-pacote"`

**Causa provável:** a dependência não foi instalada no app interno ou o comando foi executado na pasta errada.

**Solução:** entre em `.\meu-projeto-mmkv`, execute `npm install` e confirme que o pacote aparece no `package.json` interno. Depois, reinicie o Expo; se necessário, use `npx expo start --web --clear`.

### Erro `ERESOLVE` durante `npm install`

O projeto interno possui `.npmrc` com `legacy-peer-deps=true` para resolver o conflito conhecido de peer dependencies opcionais entre RNEUI e Expo Router. Certifique-se de executar `npm install` dentro da pasta interna, onde essa configuração é aplicada. Evite `--force`, pois ele pode instalar uma combinação incompatível.

### MMKV não funciona no navegador

Isso é esperado: MMKV requer código nativo. A implementação web usa Local Storage por meio de `src/storage.web.ts`. A versão web não grava no MMKV nativo.

### MMKV não funciona no Expo Go

Isso é esperado para módulos nativos que não fazem parte do Expo Go. Crie/execute um development build, por exemplo com `npx expo run:android` (Android) ou `npx expo run:ios` (macOS e Xcode).

### Os dados parecem ter sumido no navegador

O Local Storage é separado por origem. Confirme que está usando o mesmo protocolo, host e porta em que o cadastro foi salvo. Limpar os dados do site no navegador também remove o cadastro.

### Os ícones não aparecem

Confirme que `@react-native-vector-icons/material-icons` está instalado (ele está declarado no `package.json` interno), reinicie o Expo e limpe o cache com `npx expo start --web --clear`. Para desenvolvimento nativo, recompile o development build depois de adicionar ou alterar módulos nativos.

### O TypeScript falha em `src/components/app-tabs.web.tsx`

No estado atual do projeto, `npx tsc --noEmit` pode apontar uma incompatibilidade de tipos no componente `Pressable` de `src/components/app-tabs.web.tsx`. Esse erro está em um componente web existente fora das telas de cadastro e confirmação; o bundle web foi verificado separadamente com `npx expo export --platform web`.

## Limitações conhecidas

- No navegador, a persistência é feita com Local Storage, não com MMKV.
- O cadastro armazena a senha em texto simples para cumprir o formato do exercício. Isso não é adequado para produção.
- O botão **Novo cadastro** limpa o formulário, mas mantém o último cadastro persistido até um novo cadastro válido substituí-lo.
- A compilação nativa exige configurar as ferramentas de desenvolvimento da plataforma e um development build; Expo Go não inclui o MMKV deste projeto.
