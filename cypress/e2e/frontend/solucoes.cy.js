describe('Menu de Soluções - NEXDOM', () => {
  beforeEach(() => {
    // Evita que erros internos de JS do WordPress/Elementor quebrem o teste
    cy.on('uncaught:exception', () => false);

    cy.visit('https://nexdom.tec.br/');
  });

  it('Navegar pelo menu de Soluções', () => {

// Abrir menu do soluções
  cy.get('#e-n-menu-title-2393 > .e-n-menu-title-container > .e-n-menu-title-text').click().wait(2000);

// Acessar diretamente a página de gestão de plano de saude
 cy.visit('https://nexdom.tec.br/gestao-de-planos-de-saude/').wait(2000)


// Acessar diretamente a página de Autorização e Atendimento
 cy.visit('https://nexdom.tec.br/autorizacao-e-atendimento/')
    .title().should('eq', '02 – Autorização e Atendimento – nexdom.tec.br').wait(2000);

    // validar submenu "ATD Captura" na página de Autorização e Atendimento
    cy.get('#e-n-tab-title-737046921').click().wait(1000)

    // validar submenu "Motor de Regra de Negócio" na página de Autorização e Atendimento
    cy.get('#e-n-tab-title-737046922').click().wait(1000)

    // validar submenu "Autorizador On-line" na página de Autorização e Atendimento
    cy.get('#e-n-tab-title-737046923').click().wait(1000)

    // validar submenu "Auditoria Web" na página de Autorização e Atendimento
    cy.get('#e-n-tab-title-737046924').click().wait(1000)


// Acessar diretamente a página de Ressarcimento ao sus
  cy.visit('https://nexdom.tec.br/ressarcimento-ao-sus/')
    .title().should('eq', '03 – Ressarcimento ao SUS – nexdom.tec.br').wait(2000);


// Acessar diretamente a página de Portal da Empresa e Beneficiário
  cy.visit('https://nexdom.tec.br/portal-da-empresa-e-beneficiario/')
    .title().should('eq', '04 – Portal da Empresa e Beneficiário – nexdom.tec.br').wait(2000);

     // validar submenu "Portal Empresa" na página de Empresa e Beneficiário
     cy.get('#e-n-tab-title-602286361').click().wait(1000)

     // validar submenu "Portal Beneficiário" na página de Empresa e Beneficiário
     cy.get('#e-n-tab-title-602286362').click().wait(1000)
    
     // validar submenu "Portal Operadora" na página de Empresa e Beneficiário
     cy.get('#e-n-tab-title-602286363').click().wait(1000)

     // validar submenu "Portal de Auditoria (AMC)" na página de Empresa e Beneficiário
     cy.get('#e-n-tab-title-602286364').click().wait(1000)


// Acessar diretamente a página de Gestão de Relacionamento e Ouvidoria
  cy.visit('https://nexdom.tec.br/gestao-de-relacionamento-e-ouvidoria/')
    .title().should('eq', '05 – Gestão de Relacionamento e Ouvidoria – nexdom.tec.br').wait(2000);


// Acessar diretamente a página de Gestão de Relacionamento e Ouvidoria
  cy.visit('https://nexdom.tec.br/data-health/')
    .title().should('eq', '06 – DataHealth – nexdom.tec.br').wait(2000);


// Acessar diretamente a página de Gestão de Cartas Negativas
  cy.visit('https://nexdom.tec.br/07-gestao-de-cartas-negativas/')
    .title().should('eq', 'Gestão de Cartas Negativas – nexdom.tec.br').wait(2000);


// Acessar diretamente a página de Declaração de Saúde Online
  cy.visit('https://nexdom.tec.br/07-declaracao-de-saude/')
    .title().should('eq', 'Declaração de Saúde Online – nexdom.tec.br').wait(2000);
    
  });
})