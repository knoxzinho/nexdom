class ContatoPage {

  visit() {
    cy.visit('https://nexdom.tec.br/contato/');
  }

  getNameField() {
    return cy.get('#form-field-nome');
  }

}

module.exports = ContatoPage;