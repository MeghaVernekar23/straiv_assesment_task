import { deleteUserAccount, fillSignUpForm, navigateToLogin, registerUser, logoutUser } from "../support/userRegHelpers";
import { userName, userEmail, loginUrl, userPassword } from "../support/commonHelpers";
import { logUserIn } from "../support/userLoginHelpers";


describe('User Registration', () => {

    // Positive Test Case
    it('should register a new user with valid signup form data', () => {
        navigateToLogin();
        registerUser(userName, userEmail)
        deleteUserAccount();
    })

    it('should register a new user with optional fields not filled', () => {
        navigateToLogin();
        registerUser(userName, userEmail, false)
        deleteUserAccount();
    });

    it('should register a new user with case-insensitive data', () => {
        navigateToLogin();
        registerUser('VALIDNAME', 'VALID.NAME@example.com', true) 
        deleteUserAccount();
    });

    it('should show error for already registered email', () => {
        navigateToLogin();
        registerUser(userName, userEmail);
        logoutUser();
        fillSignUpForm(userName, userEmail)
        cy.get('.signup-form').should('contain.text', 'Email Address already exist!');
        logUserIn(userEmail, userPassword, loginUrl);
        deleteUserAccount();
        
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
    
    it('should not be allowed to register new user as there is missing data in mandatory fields', () => {
        navigateToLogin();
        fillSignUpForm(userName, userEmail);
        cy.get('button[data-qa="create-account"]').click();
        cy.get('input[data-qa="password"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Fülle dieses Feld aus.');
        });
    });
})