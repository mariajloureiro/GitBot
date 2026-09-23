describe('Teste de Integração - Fluxo Completo do Chat', () => {

  beforeEach(() => {
    cy.visit('index.html');
  });

  it('Deve iniciar na Landing Page e navegar até o Chat', () => {
    cy.get('#welcome-screen').should('be.visible');
    cy.get('#nav-reset').should('not.be.visible');
    cy.contains('Começar Agora').click();

    cy.get('#chat-screen').should('be.visible');
    cy.get('#nav-reset').should('be.visible');
  });

  it('Deve responder corretamente uma pergunta e atualizar a pontuação', () => {
    cy.contains('Começar Agora').click();
    
    // Digita a resposta no input e envia
    cy.get('#user-input').type('git status');
    cy.get('.btn-send').click();

    // Verifica se a resposta correta e a nova pontuação aparecem no DOM
    cy.get('#chat-messages').should('contain', 'Resposta Correta!');
    cy.get('#score').should('have.text', '10');
  });

  it('Deve pedir dica ao clicar no botão Dica', () => {
    cy.contains('Começar Agora').click();
    cy.get('#hint-btn').click();
    cy.get('#chat-messages').should('contain', 'Dica 1');
  });

});