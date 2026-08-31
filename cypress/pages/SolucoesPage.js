class SolucoesPage {

  getOption(option) {
    return cy.contains('a', option);
  }

}

module.exports = SolucoesPage;