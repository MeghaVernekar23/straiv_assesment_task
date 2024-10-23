import { registerUser } from "../support/userRegistrationHelpers";
import { user } from "../support/commonHelpers";
import { logInUser } from "../support/userLoginHelpers";

beforeEach(() => {
  cy.navigatelogin();
});


describe('User Login with Positive Scenarios', () => {

  it('Should be able to see the login form', () => {
    cy.navigatelogin();
  });

  it('Should be able to allow login with proper credentials', () => {
    registerUser(user.name, user.email);
    cy.logout();
    cy.navigatelogin();
    logInUser(user.email, user.password);
    cy.wait(1000);
    cy.contains(`Logged in as ${user.name}`).should('be.visible');
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('a[href="/delete_account"]').should('be.visible');
    cy.deleteUserAccount();
  });

  it('should display an error for invalid credentials', () => {
    logInUser('invaliduser@example.com', 'invalidpassword');
    cy.get('.login-form').should('contain.text', 'Your email or password is incorrect!');

  });

});

describe('User Login with Negative Scenarios', () => {

  it('should prevent SQL injection in login form', () => {
    logInUser("OR **--", 'password');
    cy.get('input[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;   
        expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "OR**--" fehlt ein @-Zeichen.');
    });
  });
  
  it('should display an error for missing password field', () => {
    cy.get('input[data-qa="login-email"]').type(user.email);
    cy.get('button[data-qa="login-button"]').click();
    cy.get('input[data-qa="login-password"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;   
      expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
    });
  });
  
  it('should display an error for missing email field', () => {
    cy.get('input[data-qa="login-password"]').type(user.password);
    cy.get('button[data-qa="login-button"]').click();
    cy.get('input[data-qa="login-email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;   
      expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
    });
  });
});
