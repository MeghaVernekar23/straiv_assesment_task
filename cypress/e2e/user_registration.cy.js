import { deleteUserAccount, fillSignUpForm, navigateToLogin, registerUser, logoutUser } from "../support/userRegHelpers";

describe('User Registration', () => {

    // Positive Test Case
    it('should register a new user with valid signup form data', () => {
        navigateToLogin();

        registerUser('validname', 'validname@example.com')
        
        deleteUserAccount();
    })

    it('should register a new user with optional fields not filled', () => {
        navigateToLogin();

        registerUser('validname', 'validname@example.com', false)

        deleteUserAccount();
    });

    it('should register a new user with case-insensitive data', () => {
        navigateToLogin();
        registerUser('VALIDNAME', 'VALID.NAME@example.com') 
        deleteUserAccount();
    });

    it('should show error for already registered email', () => {
        navigateToLogin();

        registerUser('validname', 'validname@example.com');

        logoutUser();

        fillSignUpForm('validname', 'validname@example.com')
        
        cy.get('.signup-form').should('contain.text', 'Email Address already exist!');
        
    })

    // Negative Test Case
    it('should not be allowed to register new user as validation fails', () => {
        navigateToLogin();

        fillSignUpForm('invalidname', 'invaliduser4-example.com')

        cy.get('input[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "invaliduser4-example.com" fehlt ein @-Zeichen.');
        });

    });

})