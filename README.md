# 🖋️ InkFlow | Sistema de Gestão para Estúdio de Tatuagem

Uma aplicação Fullstack desenvolvida para estúdios de tatuagem. O **InkFlow** oferece uma vitrine elegante para o portfólio do artista e um sistema integrado para que os clientes solicitem agendamentos. Conta com um Painel de Administração protegido para o tatuador gerir a sua agenda.

## 📋 Sobre o Projeto
O objetivo deste projeto é demonstrar a criação de uma arquitetura Fullstack completa, com separação clara de responsabilidades entre a interface de utilizador e o servidor. A aplicação permite a visualização de trabalhos, o registo de novos pedidos de tatuagem e a gestão desses pedidos (Confirmar/Cancelar) através de um painel de controlo restrito.

### 🛠️ Tecnologias Utilizadas

#### **Frontend (Interface)**
* **React + Vite**: Criação de uma Single Page Application (SPA) rápida e modular.
* **Hooks (useState, useEffect)**: Gestão de estado e consumo da API REST.
* **CSS3 (Dark Theme)**: Estilização responsiva desenhada do zero, com foco em UI/UX para o nicho artístico.

#### **Backend (Servidor & Base de Dados)**
* **Node.js**: Servidor HTTP para processamento de rotas e regras de negócio.
* **Prisma ORM**: Modelagem e interação com a base de dados de forma segura e tipada.
* **SQLite**: Base de dados relacional leve e integrada para armazenamento de portfólio e agenda.
* **Autenticação Simples**: Proteção de rotas administrativas usando `x-api-key` nos headers.

## ✨ Funcionalidades
1. **Vitrine Dinâmica**: Exibição do portfólio de tatuagens vindos diretamente da base de dados.
2. **Sistema de Agendamento**: Formulário onde o cliente envia os seus dados, data pretendida e descrição da ideia.
3. **Dashboard Administrativo**: Painel restrito por senha onde o tatuador pode ver todos os pedidos.
4. **Gestão de Status**: O tatuador pode alterar o status do agendamento para `CONFIRMADO` (Verde), `PENDENTE` (Laranja) ou `CANCELADO` (Vermelho).

## 📂 Estrutura do Projeto
```text
├── backend/
│   ├── prisma/          # Esquema da base de dados (schema.prisma) e migrações
│   ├── routes/          # Definição dos endpoints (Agendamentos e Portfólio)
│   ├── server.js        # Configuração principal do servidor Node.js
│   └── dev.db           # Ficheiro da base de dados SQLite
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Componente principal (Portfólio)
│   │   ├── agendamentoForm.jsx # Componente do formulário de clientes
│   │   ├── PainelAdmin.jsx     # Dashboard de gestão
│   │   └── App.css             # Estilos globais (Dark Theme)
└── README.md
