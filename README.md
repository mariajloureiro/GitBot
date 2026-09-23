# 🤖 GitBot - Protótipo com Testes Automatizados

O **GitBot** é um projeto desenvolvido para demonstrar a integração de três camadas de testes automatizados (Unitários, Integração e Performance) executados de forma independente em uma pipeline de Integração Contínua (CI) via **GitHub Actions**.

## 📁 Estrutura do Projeto

```
GITBOT/
├── .github/
│   └── workflows/          # Configuração da pipeline de CI (GitHub Actions)
├── tests/
│   └── unit/               # Testes unitários do projeto
├── .lighthouserc.json      # Configuração dos testes de performance (LHCI)
├── index.html              # Interface do projeto
├── package.json            # Scripts e dependências do Node.js
├── package-lock.json       # Mapeamento exato das dependências
├── script.js               # Lógica principal da aplicação
└── style.css               # Estilização da interface
```

## 🛠️ Tecnologias e Ferramentas de Teste

| Tipo de Teste | Ferramenta / Framework | Descrição |
| :--- | :--- | :--- |
| **Unitário** | [Jest](https://jestjs.io/) | Valida funções, módulos e lógicas isoladas no `script.js`. |
| **Integração** | [Jest](https://jestjs.io/) | Valida a interação entre diferentes partes do código ou com o DOM (`jsdom`). |
| **Performance** | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Analisa métricas de carregamento, acessibilidade e performance do `index.html`. |

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

* **Node.js** (versão 18 ou superior)
* **npm** (gerenciador de pacotes)

### 1. Instalar as dependências

Antes de rodar os testes, instale os pacotes do projeto para garantir que o Jest e o Lighthouse estejam disponíveis:

```bash
npm install
```

### 2. Executar os testes localmente de forma independente

* **Testes Unitários:**
  ```bash
  npm run test:unit
  ```

* **Testes de Integração:**
  ```bash
  npm run test:integration
  ```

* **Testes de Performance:**
  ```bash
  npm run test:performance
  ```

* **Executar todos os testes em sequência:**
  ```bash
  npm run test:all
  ```

## ⚙️ Integração Contínua (CI)

A pipeline está configurada no GitHub Actions para ser disparada automaticamente a cada `push` na branch `main`.

### Etapas da Pipeline:

1. **Checkout do código:** Baixa o código no ambiente virtual Ubuntu.
2. **Setup do Node.js:** Prepara o ambiente com Node.js e ativa o cache do npm.
3. **Instalação:** Executa `npm ci` para instalar rigorosamente as dependências do `package-lock.json`.
4. **Execução Isolada dos Testes:**
   * Runs `npm run test:unit`
   * Runs `npm run test:integration`
   * Runs `npm run test:performance`

Cada etapa é executada separadamente para permitir o monitoramento e a análise individual dos resultados na aba **Actions** do repositório no GitHub.
