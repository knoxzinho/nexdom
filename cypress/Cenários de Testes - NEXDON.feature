Feature: Navegação e funcionalidades do site NEXDOM

Como usuário do site da NEXDOM Quero navegar pelas páginas e utilizar suas funcionalidades principais Para garantir que o site esteja funcionando corretamente.

Cenário 1: Verificar o carregamento da página inicial da NEXDOM
    Given que o usuário acessa a página inicial do site da NEXDOM
    When a página for carregada
    Then a página inicial deve ser exibida corretamente
    And o menu de navegação deve estar visível
    And o conteúdo principal da página deve estar visível
    

Cenário 2: Navegar para a página de Soluções
    Given que o usuário está na página inicial do site da NEXDOM
    When o usuário passar o mouse sobre o menu "Soluções"
    Then as opções do submenu de "Soluções" devem ser exibidas
    When o usuário clicar na opção desejada
    Then o usuário deve ser direcionado para a página escolhida
    And a página selecionada deve ser exibida corretamente

 
Cenário 3: Submeter o formulário de contato
    Given que o usuário acessa a página de Contato do site da NEXDOM
    When o usuário preencher o formulário de contato com dados válidos
    And clicar no botão de envio do formulário
    Then o formulário deve ser enviado com sucesso
    And uma mensagem de confirmação deve ser exibida