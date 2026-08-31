describe('GitHub API', () => {

  let repositoryName;
  let repositoryOwner;
  let issueNumber;


  // =====================================================
  // 1. FASE DE AUTENTICAÇÃO
  // =====================================================

  it('Script realiza autenticação do usuário na API do GitHub', () => {

    const token = Cypress.env('githubToken');

    cy.request({
      method: 'GET',
      url: 'https://api.github.com/user',

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10'
      }

    }).then((response) => {

      // Validar o status HTTP
      expect(response.status).to.eq(200);

      // Validar se existe o login do usuário
      expect(response.body)
        .to.have.property('login');

      // Validar se o login não está vazio
      expect(response.body.login)
        .to.not.be.empty;

    });

  });


  // =====================================================
  // 2. FLUXO DO REPOSITÓRIO E ISSUE
  // =====================================================

  it('Script deve criar repositório, consultar, adicionar issue, consultar issue e excluir o repositório', () => {

    const token = Cypress.env('githubToken');

    // Gerar um nome único para evitar conflito
    repositoryName = `nexdom-${Date.now()}`;


    // =====================================================
    // CRIAÇÃO DO REPOSITÓRIO
    // =====================================================

    cy.request({
      method: 'POST',
      url: 'https://api.github.com/user/repos',

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10'
      },

      body: {
        name: repositoryName,
        description: 'Repositório criado',
        private: false
      }

    }).then((response) => {

      // Valida status da criação
      expect(response.status).to.eq(201);

      // Validar nome do repositório
      expect(response.body.name)
        .to.eq(repositoryName);

      // Validar descrição do repositório
      expect(response.body.description)
        .to.eq('Repositório criado');

      // Validar se é público ou privado
      expect(response.body.private)
        .to.eq(false);

      // Guardar o proprietário do repositório
      repositoryOwner = response.body.owner.login;

    })


    // =====================================================
    // CONSULTA DO REPOSITÓRIO
    // =====================================================

    .then(() => {

      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${repositoryOwner}/${repositoryName}`,

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10'
        }

      }).then((response) => {

        // Validar status da consulta
        expect(response.status).to.eq(200);

        // Validar nome
        expect(response.body.name)
          .to.eq(repositoryName);

        // Validar proprietário
        expect(response.body.owner.login)
          .to.eq(repositoryOwner);

      });

    })


    // =====================================================
    // CRIAÇÃO DA ISSUE
    // =====================================================

    .then(() => {

      cy.request({
        method: 'POST',
        url: `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/issues`,

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10'
        },

        body: {
          title: 'Issue criada pelo teste Cypress',
          body: 'Issue criada automaticamente durante o desafio de QA usando Cypress.'
        }

      }).then((response) => {

        // Validar status da criação
        expect(response.status).to.eq(201);

        // Validar título
        expect(response.body.title)
          .to.eq('Issue criada pelo teste Cypress');

        // Validar status
        expect(response.body.state)
          .to.eq('open');

        // Guardar o número da Issue
        issueNumber = response.body.number;

        // Validar se o número é realmente numérico
        expect(issueNumber)
          .to.be.a('number');

      });

    })


    // =====================================================
    // CONSULTA DA ISSUE
    // =====================================================

    .then(() => {

      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/issues/${issueNumber}`,

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10'
        }

      }).then((response) => {

        // Validar status da consulta
        expect(response.status).to.eq(200);

        // Validar número da Issue
        expect(response.body.number)
          .to.eq(issueNumber);

        // Validar título
        expect(response.body.title)
          .to.eq('Issue criada pelo teste Cypress');

        // Validar estado
        expect(response.body.state)
          .to.eq('open');

      });

    })


    // =====================================================
    // EXCLUSÃO DO REPOSITÓRIO
    // =====================================================

    .then(() => {

      cy.request({
        method: 'DELETE',
        url: `https://api.github.com/repos/${repositoryOwner}/${repositoryName}`,

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10'
        }

      }).then((response) => {

        // Validar se o repositório foi excluído
        expect(response.status).to.eq(204);

      });

    })


    // =====================================================
    // CONFIRMAÇÃO DA EXCLUSÃO
    // =====================================================

    .then(() => {

      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${repositoryOwner}/${repositoryName}`,

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10'
        },

        // Esperamos 404, então o Cypress não deve
        // considerar automaticamente como falha
        failOnStatusCode: false

      }).then((response) => {

        // O repositório não deve mais existir
        expect(response.status).to.eq(404);

      });

    });

  });

});