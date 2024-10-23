import { registerUser } from "../support/userRegHelpers";
import { userName, userEmail, loginUrl, userPassword } from "../support/commonHelpers";
import { logInUser } from "../support/userLoginHelpers";

beforeEach(() => {
  cy.navigatelogin();
});


describe('User Login with Positive Scenarios', () => {

  // Positive test case

  it('Should be able to see the login form', () => {
    cy.navigatelogin();
  });

  it('Should be able to allow login with proper credentials', () => {
    registerUser(userName, userEmail);
    cy.logout();
    cy.navigatelogin();
    logInUser(userEmail, userPassword, loginUrl);
    cy.wait(1000);
    cy.contains(`Logged in as ${userName}`).should('be.visible');
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('a[href="/delete_account"]').should('be.visible');
    cy.deleteUserAccount();
  });

  it('should display an error for invalid credentials', () => {
    logInUser('invaliduser@example.com', 'invalidpassword', loginUrl);
    cy.get('.login-form').should('contain.text', 'Your email or password is incorrect!');

  });

});

describe('User Login with Negative Scenarios', () => {

  it('should prevent SQL injection in login form', () => {
    logInUser("OR **--", 'password', loginUrl);
    cy.get('input[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;   
        expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "OR**--" fehlt ein @-Zeichen.');
    });
  });
});
