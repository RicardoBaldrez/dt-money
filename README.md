<div align="center">

<img src="./src/assets/Logo.png" alt="Logo do DT Money" width="180" />

# 💰 DT Money

**Suas finanças pessoais, direto no celular.**<br/>
Registre entradas e saídas e acompanhe seu saldo de um jeito simples.

![Status](https://img.shields.io/badge/status-em_desenvolvimento-F5A623?style=for-the-badge)

![React Native](https://img.shields.io/badge/React_Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-SDK_58-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

> [!NOTE]
> 🚧 **Projeto em construção.** A autenticação e a estrutura de navegação já estão prontas; as telas de transações são as próximas.

## 📑 Sumário

- [O que já está pronto](#-o-que-j%C3%A1-est%C3%A1-pronto)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Tecnologias](#-tecnologias)
- [Estrutura](#-estrutura)
- [Rodando o projeto](#-rodando-o-projeto)

## ✅ O que já está pronto

| | Funcionalidade | Detalhes |
| :---: | --- | --- |
| 🔐 | **Login e cadastro** | formulários validados (nome, e-mail, senha e confirmação), com mensagens em português |
| ⌨️ | **AppInput** | campo reutilizável integrado ao React Hook Form, com ícone, destaque ao focar e botão de mostrar/esconder senha |
| 🔘 | **AppButton** | botão reutilizável com variação preenchida e contornada |
| 🧭 | **Navegação** | rotas públicas (login e cadastro) separadas das privadas (área logada) |
| 📱 | **Teclado** | fecha ao tocar fora do campo (`DismissKeyboardView`) e tem o hook `useKeyboardVisible` para reagir quando ele abre |

## 🗺️ Roadmap

- [x] Estrutura do projeto, lint e formatação
- [x] Componentes de formulário e botão
- [x] Telas de login e cadastro com validação
- [x] Navegação entre rotas públicas e privadas
- [ ] Integração com a API e autenticação
- [ ] Tela inicial com resumo de entradas, saídas e saldo
- [ ] Cadastro e listagem de transações

## 🛠 Tecnologias

| Categoria | Tecnologia |
| --- | --- |
| Base | React Native 0.88 · Expo SDK 58 · TypeScript |
| Estilo | NativeWind (Tailwind CSS no React Native) · clsx |
| Navegação | React Navigation (stack) |
| Formulários | React Hook Form · Yup |
| Animação e gestos | Reanimated · Gesture Handler |
| Ícones | Expo Vector Icons |
| Qualidade | ESLint · Prettier, com ordenação de imports e de classes do Tailwind |

## 🗂 Estrutura

```
src/
├── components/   # AppButton, AppInput, AuthHeader, ErrorMessage, DismissKeyboardView
├── routes/       # rotas públicas e privadas
├── screens/      # Login, Register e Home
├── shared/       # cores e hooks (ex.: useKeyboardVisible)
└── styles/       # CSS global do NativeWind
```

## 🚀 Rodando o projeto

> [!NOTE]
> O app usa um *development build* (`expo-dev-client`), então é preciso ter o **Android Studio** ou o **Xcode** instalados.

```bash
# 1. clone o repositório
git clone https://github.com/RicardoBaldrez/dt-money.git
cd dt-money

# 2. instale as dependências
npm install

# 3. compile e abra no emulador ou no aparelho
npm run android   # ou: npm run ios
```

### 📜 Scripts

| Comando | O que faz |
| --- | --- |
| `npm start` | servidor de desenvolvimento |
| `npm run android` / `npm run ios` | compila e abre no emulador ou no aparelho |
| `npm run lint` / `npm run lint:fix` | verifica ou corrige o código com ESLint |
| `npm run format` / `npm run format:check` | formata ou verifica com Prettier |
| `npm run typecheck` | checagem de tipos do TypeScript |

---

<div align="center">

Feito por **Ricardo Baldrez** 👋

[![Portfólio](https://img.shields.io/badge/portfólio-ricardobaldrez.vercel.app-0A0B14?style=flat-square&logo=vercel&logoColor=white)](https://ricardobaldrez.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardo-barbosa-baldrez-38b760145)

</div>
