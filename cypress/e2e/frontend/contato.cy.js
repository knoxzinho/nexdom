const ContatoPage = require('../../pages/ContatoPage');

describe('Formulário de Contato - NEXDOM', () => {

  const contatoPage = new ContatoPage();

  beforeEach(() => {
    // Acessa a página de contato
    contatoPage.visit();
  });

  it('deve exibir e preencher os campos do formulário', () => {

    // Valida se o campo Nome está visível e preenche com o valor "Automação de Testes"
    cy.get('[name="form_fields[name]"]').type('Automação de Testes');

    // Valida se o campo email está visível e preenche com o valor "autoteste@nexdom.com"
    cy.get('[name="form_fields[email]"]').type('autoteste@nexdom.com');

    // Valida se o campo empresa está visível e preenche com o valor "NEXDOM"
    cy.get('[name="form_fields[message]"]').type('NEXDOM');

    // Valida se o campo cargo está visível e preenche com o valor "Analista de Testes"
    cy.get('[name="form_fields[field_67e0483]"]').type('Analista de Testes');

    // Valida se o campo Telefone está visível e preenche com o valor "11999999999"
    cy.get('[name="form_fields[field_5778e7b]"]').type('11999999999');

    // Valida se o campo assunto está visível e preenche com o valor "Teste de automação"
    cy.get('[name="form_fields[field_f77a763]"]').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

    // Marcar checkbox de aceite de termos e condições
    cy.get('[name="form_fields[field_7651528]"]').check();

    // Valida se o botão Enviar está visível e clica nele
    cy.get('.elementor-field-type-submit > .elementor-button > .elementor-button-content-wrapper').click();

  });

});