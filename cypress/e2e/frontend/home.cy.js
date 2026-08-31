const HomePage = require('../../pages/HomePage');

describe('Página Inicial - NEXDOM', () => {

  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('Validar título correto da página', () => {

    homePage
      .getPageTitle()
      .should('eq', 'nexdom.tec.br');

  });

});