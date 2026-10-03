# 🚀 Onyx Barber System

Sistema web para gerenciamento e agendamento de serviços da **Onyx Barber**.

Projeto desenvolvido com foco em praticidade, experiência do usuário, responsividade e uma arquitetura preparada para futuras expansões.

---

## 📌 Status do Projeto

### ✅ Concluído

- Estrutura inicial do projeto React
- Organização de pastas
- Configuração de rotas
- React Router
- Navbar responsiva
- Footer
- Hero Section
- Identidade visual
- Estrutura da página Home
- Estrutura da página Trabalhos
- Estrutura inicial da página de Avaliações
- Fluxo de agendamento
- Seleção de múltiplos serviços
- Cálculo de duração dos serviços
- Cálculo de valor dos serviços
- Seleção de data
- Seleção de horário
- Tela de confirmação do agendamento
- Modal de criação de conta ou convidado
- Página de Login
- Página de Cadastro
- Máscara de telefone
- Botão de login com Google preparado para integração futura
- Organização inicial dos assets
- Planejamento da arquitetura Backend
- Planejamento do Banco de Dados

### 🚧 Em Desenvolvimento

- Recuperação de senha
- Página de Trabalhos com fotos e vídeos
- Sistema de Avaliações
- Área do Cliente
- Histórico de serviços
- Programa de fidelidade
- Melhorias de responsividade
- Melhorias de UX/UI

---

## 🏗️ Arquitetura do Projeto

### Frontend

- React
- JavaScript
- CSS
- React Router DOM

### Backend

**Planejado**

- Node.js
- Express

### Banco de Dados

**Planejado**

- PostgreSQL

---

## 🎨 Design System

### Cores

| Cor | Hex |
|------|------|
| Preto Principal | `#0A0A0A` |
| Verde Neon | `#39FF14` |
| Verde Escuro | Personalizado |
| Branco | `#FFFFFF` |

### Estilo

- Moderno
- Funcional
- Responsivo
- Intuitivo
- Focado na experiência do usuário
- Mobile Friendly

---

## 📂 Estrutura Atual

```bash
src/
│
├── assets/
│   ├── icons/
│   │   └── google-icon.png
│   └── images/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   │
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Services/
│   ├── Booking/
│   ├── Login/
│   ├── Register/
│   └── ForgotPassword/
│
├── routes/
│   └── AppRoutes.jsx
│
└── App.jsx