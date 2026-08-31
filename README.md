# Desafio da Nexdom para QA

Projeto de automação de testes desenvolvido com **Cypress**, contemplando testes de funcionalidades de **Frontend** e testes de **API do GitHub**.

## Tecnologias

- **JavaScript**
- **Node.js**
- **Cypress**
- **Git**
- **GitHub API**

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

> **Observação:** o Cypress também é instalado como dependência do projeto durante o `npm install`.

## Download do projeto

Clone o repositório:

```bash
git clone https://github.com/knoxzinho/nexdom.git
```

Acesse a pasta do projeto:

```bash
cd nexdom
```

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Configuração

### GitHub Token

Os testes de API do GitHub utilizam um **Personal Access Token (PAT)** para autenticação.

Por questões de segurança, o token utilizado nos testes **não está armazenado no código-fonte nem versionado no GitHub**.

Crie um novo token nas configurações do GitHub:

https://github.com/settings/personal-access-tokens

O token deve possuir as configurações e permissões necessárias para as operações realizadas pelos testes:

- **Repository access:** `All repositories`
- **Administration:** `Read and write`
- **Issues:** `Read and write`
- **Metadata:** `Read-only` (configuração padrão)

> **Importante:** conceda somente as permissões necessárias para a execução dos testes e evite compartilhar o token.

### Configurando o ambiente

Utilize o arquivo `cypress.env.example.json` como modelo.

1. Crie, na raiz do projeto, um arquivo chamado `cypress.env.json`.
2. Copie a estrutura do arquivo `cypress.env.example.json`.
3. Informe seu token pessoal do GitHub:

```json
{
  "githubToken": "SEU_TOKEN_AQUI"
}
```

4. Salve o arquivo.

> **Importante:** o arquivo `cypress.env.json` contém informações sensíveis e está configurado no `.gitignore`. **Não compartilhe nem versione esse arquivo.**

## Execução dos testes

### Executar todos os testes

```bash
npx cypress run
```

### Abrir o Cypress

Para executar os testes utilizando a interface gráfica:

```bash
npx cypress open
```

Na interface do Cypress:

1. Selecione **E2E Testing**.
2. Escolha o navegador desejado.
3. Selecione o teste que deseja executar.

### Executar somente os testes de API

```bash
npx cypress run --spec "cypress/e2e/backend/github.cy.js"
```

### Executar somente os testes de Frontend

```bash
npx cypress run --spec "cypress/e2e/frontend/*.cy.js"
```

## Testes automatizados

### Frontend

Os testes de Frontend contemplam:

- Página inicial
- Página de soluções
- Página de contato

### Backend

Os testes de API do GitHub contemplam:

- Autenticação do usuário
- Criação de repositório
- Consulta do repositório
- Criação de Issue
- Consulta da Issue
- Exclusão do repositório

## Estrutura do projeto

```text
Nexdom QA/
│
├── cypress/
│   ├── e2e/
│   │   ├── backend/
│   │   │   └── github.cy.js
│   │   │
│   │   └── frontend/
│   │       ├── contato.cy.js
│   │       ├── home.cy.js
│   │       └── solucoes.cy.js
│   │
│   ├── fixtures/
│   │
│   ├── pages/
│   │   ├── ContatoPage.js
│   │   ├── HomePage.js
│   │   └── SolucoesPage.js
│   │
│   └── support/
│
├── docs/
│
├── cypress.config.js
├── cypress.env.example.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Segurança

Credenciais e tokens de autenticação **não devem ser armazenados diretamente no código-fonte**.

O arquivo `cypress.env.json` é utilizado localmente para armazenar o GitHub Token e está configurado no `.gitignore` para impedir seu versionamento.

Utilize sempre o arquivo `cypress.env.example.json` como referência para configurar o ambiente.

## Desafios encontrados durante o teste

### Automação de operações no GitHub

Nunca havia realizado a automação de processos como criação, alteração e remoção de repositórios no GitHub. Dessa forma, foi necessário aprender rapidamente como estruturar e executar essas operações por meio de testes automatizados, garantindo que cada etapa fosse validada corretamente.

### Versionamento do projeto com Git e GitHub

Embora já tivesse experiência com Git para clonar projetos e utilizá-los localmente, nunca havia criado um projeto do zero e realizado todo o processo de versionamento, incluindo configuração do repositório, commits e publicação no GitHub.

Esse processo foi um desafio importante, pois também proporcionou um melhor entendimento sobre como estruturar o projeto, quais arquivos e informações deveriam ou não ser versionados e como trabalhar com dados sensíveis sem expô-los publicamente.

### Validação e evolução dos scripts

A cada nova implementação ou alteração nos scripts, era realizada uma execução rápida para verificar se as funcionalidades que já estavam funcionando continuavam operacionais.

Esse processo foi particularmente desafiador, pois, durante os ajustes e melhorias, passei a enxergar essas validações como uma forma de **teste de regressão**, garantindo que novas alterações não introduzissem problemas em funcionalidades anteriormente validadas.

### Evolução dos scripts e observações sobre o site da NEXDOM

Durante a criação e evolução dos scripts, também foram identificadas oportunidades de melhoria tanto na escrita dos comentários e na organização dos testes quanto na forma de validação de determinados elementos do site da NEXDOM.

Além disso, foram observados alguns padrões inconsistentes entre determinadas páginas, como títulos e outros elementos estruturais que poderiam ser padronizados.

Essas observações não representam problemas que impeçam a utilização ou comprometam diretamente a usabilidade do site. Entretanto, fazem parte do olhar de qualidade esperado durante a execução de testes.

Para um profissional de QA, identificar inconsistências, padrões que podem ser aprimorados e oportunidades de melhoria também é parte fundamental do processo de garantia da qualidade.

## Autor

**Rian Barbosa dos Santos**
