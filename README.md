## Configuração das variáveis de ambiente

O arquivo `cypress.env.json` é utilizado para armazenar variáveis de ambiente sensíveis, como tokens de autenticação, que não devem ser compartilhados publicamente.

O arquivo `cypress.env.example.json` é um modelo de configuração. O token do GitHub presente nele foi substituído por um valor fictício para fins de segurança.

### Configurando o arquivo

1. Crie um novo arquivo chamado `cypress.env.json` na raiz do projeto.

2. Copie o conteúdo do arquivo `cypress.env.example.json` para o novo arquivo `cypress.env.json`.

3. Substitua o valor de `githubToken` pelo seu token pessoal do GitHub.

4. Nunca compartilhe ou versione o arquivo `cypress.env.json`.

> O arquivo `cypress.env.json` está configurado no `.gitignore` e não deve ser enviado ao repositório.