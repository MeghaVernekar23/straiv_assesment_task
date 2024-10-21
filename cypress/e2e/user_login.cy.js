const loginUrl = 'https://www.automationexercise.com/login';

describe('Automating User Login', () => {
  
  it('Should be able to see the login form', () => {
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

describe('SQL Injection Test', () => {
  it('should prevent SQL injection in login form', () => {

    cy.visit(loginUrl);
    // cy.get('form').then(form => {
    //   form[0].setAttribute('novalidate', 'novalidate');
    // });
    cy.get('input[data-qa="login-email"]').type("OR **--");
    cy.get('input[data-qa="login-password"]').type('password');

    cy.get('button[data-qa="login-button"]').click();
    
    cy.get('input[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;   
        expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "OR**--" fehlt ein @-Zeichen.');
      });
  });
});
