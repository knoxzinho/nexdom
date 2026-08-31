describe('GitHub API', () => {

  let repositoryName;
  let repositoryOwner;
  let issueNumber;


  // =====================================================
  // 1. AUTENTICAÇÃO
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

      // Valida o status HTTP
      expect(response.status).to.eq(200);

      // Valida se existe o login do usuário
      expect(response.body)
        .to.have.property('login');

      // Valida se o login não está vazio
      expect(response.body.login)
        .to.not.be.empty;

    });

  });


  // =====================================================
  // 2. FLUXO DO REPOSITÓRIO E ISSUE
  // =====================================================

  it('Script deve criar repositório, consultar, adicionar issue, consultar issue e excluir o repositório', () => {

    const token = Cypress.env('githubToken');

    // Gera um nome único para evitar conflito
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

      // Valida nome
      expect(response.body.name)
        .to.eq(repositoryName);

      // Valida descrição
      expect(response.body.description)
        .to.eq('Repositório criado');

      // Valida se é público
      expect(response.body.private)
        .to.eq(false);

      // Guarda o proprietário do repositório
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

        // Valida status da consulta
        expect(response.status).to.eq(200);

        // Valida nome
        expect(response.body.name)
          .to.eq(repositoryName);

        // Valida proprietário
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
          body: 'Issue criada automaticamente durante o desafio de QA.'
        }

      }).then((response) => {

        // Valida status da criação
        expect(response.status).to.eq(201);

        // Valida título
        expect(response.body.title)
          .to.eq('Issue criada pelo teste Cypress');

        // Valida estado
        expect(response.body.state)
          .to.eq('open');

        // Guarda o número da Issue
        issueNumber = response.body.number;

        // Valida se o número é realmente numérico
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

        // Valida status da consulta
        expect(response.status).to.eq(200);

        // Valida número da Issue
        expect(response.body.number)
          .to.eq(issueNumber);

        // Valida título
        expect(response.body.title)
          .to.eq('Issue criada pelo teste Cypress');

        // Valida estado
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

        // Valida se o repositório foi excluído
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