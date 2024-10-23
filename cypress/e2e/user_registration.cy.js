import { fillSignUpForm, registerUser } from "../support/userRegistrationHelpers";
import { userName, userEmail, userPassword } from "../support/commonHelpers";
import { logInUser } from "../support/userLoginHelpers";

beforeEach(() => {
    cy.navigatelogin();
});

describe('User Registration with positive scenarios', () => {

    it('should register a new user with valid signup form data', () => {
        cy.wait(1000);
        registerUser(userName, userEmail)
        cy.deleteUserAccount();
    })

    it('should register a new user with optional fields not filled', () => {
        registerUser(userName, userEmail, false)
        cy.deleteUserAccount();
    });

    it('should register a new user with case-insensitive data', () => {
        registerUser('VALIDNAME', 'VALID.NAME@example.com', true) 
        cy.deleteUserAccount();
    });

    it('should show error for already registered email', () => {
        registerUser(userName, userEmail);
        cy.logout();
        fillSignUpForm(userName, userEmail)
        cy.get('.signup-form').should('contain.text', 'Email Address already exist!');
        cy.navigatelogin();
        logInUser(userEmail, userPassword);
        cy.deleteUserAccount();  
    })
});

describe('User Registration with negative scenarios', () => {

    it('should not be allowed to register new user as validation fails', () => {
        fillSignUpForm('invalidname', 'invaliduser4-example.com')
        cy.get('input[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "invaliduser4-example.com" fehlt ein @-Zeichen.');
        });
    });
    
    it('should not be allowed to register new user as there is missing data in mandatory fields', () => {
        fillSignUpForm(userName, userEmail);
        cy.get('button[data-qa="create-account"]').click();
        cy.get('input[data-qa="password"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
        });
    });

    it('should not be allowed to register new user as there is missing firstname mandatory field', () => {
        fillSignUpForm(userName, userEmail);
        cy.get('button[data-qa="create-account"]').click();
        cy.get('input[data-qa="password"]').type("password123");
        cy.get('input[data-qa="first_name"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
        });
    });

});