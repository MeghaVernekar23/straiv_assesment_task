describe('Login Automation on AutomationExercise.com', () => {
  const loginUrl = 'https://www.automationexercise.com/login';
  
  it('should load the login page and allow user to login', () => {
      cy.visit(loginUrl);
    
      cy.url().should('include', '/login');
      cy.get('h2').contains('Login to your account').should('be.visible');

  });

  it('should display an error for invalid credentials', () => {

      cy.visit(loginUrl);

      cy.get('input[data-qa="login-email"]').type('invaliduser@example.com');
      cy.get('input[data-qa="login-password"]').type('invalidpassword');

      cy.get('button[data-qa="login-button"]').click();

      cy.get('.login-form').should('contain.text', 'Your email or password is incorrect!');
  });
});
