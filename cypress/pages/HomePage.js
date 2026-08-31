class HomePage {

  visit() {
    cy.visit('https://nexdom.tec.br/');
  }

  getPageTitle() {
    return cy.title();
  }

  getSolutionsMenu() {
    return cy.contains('Soluções').first();
  }

  openSolutionsMenu() {
    this.getSolutionsMenu()
      .should('be.visible')
      .click();
  }

}

module.exports = HomePage;