import { fillSignUpForm, registerUser } from "../support/userRegHelpers";
import { userName, userEmail, loginUrl, userPassword } from "../support/commonHelpers";
import { logInUser } from "../support/userLoginHelpers";


describe('User Registration', () => {

    // Positive Test Case
    it.only('should register a new user with valid signup form data', () => {
        cy.navigatelogin();
        cy.wait(1000);
        registerUser(userName, userEmail)
        cy.deleteUserAccount();
    })

    it('should register a new user with optional fields not filled', () => {
        cy.navigatelogin();
        registerUser(userName, userEmail, false)
        cy.deleteUserAccount();
    });

    it('should register a new user with case-insensitive data', () => {
        cy.navigatelogin();
        registerUser('VALIDNAME', 'VALID.NAME@example.com', true) 
        cy.deleteUserAccount();
    });

    it('should show error for already registered email', () => {
        cy.navigatelogin();
        registerUser(userName, userEmail);
        cy.logout();
        fillSignUpForm(userName, userEmail)
        cy.get('.signup-form').should('contain.text', 'Email Address already exist!');
        logInUser(userEmail, userPassword, loginUrl);
        cy.deleteUserAccount();
        
    })

    // Negative Test Case
    it('should not be allowed to register new user as validation fails', () => {
        cy.navigatelogin();
        fillSignUpForm('invalidname', 'invaliduser4-example.com')
        cy.get('input[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "invaliduser4-example.com" fehlt ein @-Zeichen.');
        });
    });
    
    it('should not be allowed to register new user as there is missing data in mandatory fields', () => {
        cy.navigatelogin();
        fillSignUpForm(userName, userEmail);
        cy.get('button[data-qa="create-account"]').click();
        cy.get('input[data-qa="password"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
        });
    });
})