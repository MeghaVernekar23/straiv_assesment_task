import { deleteUserAccount, Url } from "../support/userRegHelpers";

describe('User Registration', () => {
    // Positive Test Case
    it('should register a new user with valid signup form data', () => {
        cy.visit(Url)

        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type('validname');
        cy.get('input[data-qa="signup-email"]').type('validname@example.com');        
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check()
        cy.get('input[data-qa="password"]').type('password123')
        cy.get('select[data-qa="days"]').select('10')  
        cy.get('select[data-qa="months"]').select('January')
        cy.get('select[data-qa="years"]').select('1990')
        cy.get('input[data-qa="first_name"]').type('John')
        cy.get('input[data-qa="last_name"]').type('Doe')
        cy.get('input[data-qa="company"]').type('Test Company')
        cy.get('input[data-qa="address"]').type('123 Test Street')
        cy.get('select[data-qa="country"]').select('Australia')
        cy.get('input[data-qa="state"]').type('California')
        cy.get('input[data-qa="city"]').type('City_1')
        cy.get('input[data-qa="zipcode"]').type('90210')
        cy.get('input[data-qa="mobile_number"]').type('1234567890')

        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click();
        
        deleteUserAccount();
    })

    it('should register a new user with optional fields not filled', () => {
        cy.visit(Url)

        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type('validname');
        cy.get('input[data-qa="signup-email"]').type('validname@example.com');        
        cy.get('button[data-qa="signup-button"]').click();

        // cy.get('#id_gender1').check()
        cy.get('input[data-qa="password"]').type('password123')
        cy.get('select[data-qa="days"]').select('10')  
        cy.get('select[data-qa="months"]').select('January')
        cy.get('select[data-qa="years"]').select('1990')
        cy.get('input[data-qa="first_name"]').type('John')
        cy.get('input[data-qa="last_name"]').type('Doe')
        // cy.get('input[data-qa="company"]').type('Test Company')
        cy.get('input[data-qa="address"]').type('123 Test Street')
        cy.get('select[data-qa="country"]').select('Australia')
        cy.get('input[data-qa="state"]').type('California')
        cy.get('input[data-qa="city"]').type('City_1')
        cy.get('input[data-qa="zipcode"]').type('90210')
        cy.get('input[data-qa="mobile_number"]').type('1234567890')

        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click();
        
        deleteUserAccount();
    });

    it('should register a new user with case-insensitive data', () => {
        cy.visit(Url)

        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type('VALIDNAME');
        cy.get('input[data-qa="signup-email"]').type('VALID.NAME@example.com');        
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check()
        cy.get('input[data-qa="password"]').type('password123')
        cy.get('select[data-qa="days"]').select('10')  
        cy.get('select[data-qa="months"]').select('January')
        cy.get('select[data-qa="years"]').select('1990')
        cy.get('input[data-qa="first_name"]').type('John')
        cy.get('input[data-qa="last_name"]').type('Doe')
        cy.get('input[data-qa="company"]').type('Test Company')
        cy.get('input[data-qa="address"]').type('123 Test Street')
        cy.get('select[data-qa="country"]').select('Australia')
        cy.get('input[data-qa="state"]').type('California')
        cy.get('input[data-qa="city"]').type('City_1')
        cy.get('input[data-qa="zipcode"]').type('90210')
        cy.get('input[data-qa="mobile_number"]').type('1234567890')

        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click();
        
        deleteUserAccount();
    });

    it('should show error for already registered email', () => {
        cy.visit(Url)

        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type('validname');
        cy.get('input[data-qa="signup-email"]').type('validname@example.com');        
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check()
        cy.get('input[data-qa="password"]').type('password123')
        cy.get('select[data-qa="days"]').select('10')  
        cy.get('select[data-qa="months"]').select('January')
        cy.get('select[data-qa="years"]').select('1990')
        cy.get('input[data-qa="first_name"]').type('John')
        cy.get('input[data-qa="last_name"]').type('Doe')
        cy.get('input[data-qa="company"]').type('Test Company')
        cy.get('input[data-qa="address"]').type('123 Test Street')
        cy.get('select[data-qa="country"]').select('Australia')
        cy.get('input[data-qa="state"]').type('California')
        cy.get('input[data-qa="city"]').type('City_1')
        cy.get('input[data-qa="zipcode"]').type('90210')
        cy.get('input[data-qa="mobile_number"]').type('1234567890')

        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click();
        cy.get('a[href="/logout"]').click()
        cy.get('input[data-qa="signup-name"]').type('validname');
        cy.get('input[data-qa="signup-email"]').type('validname@example.com');
        cy.get('button[data-qa="signup-button"]').click(); 
        cy.get('.signup-form').should('contain.text', 'Email Address already exist!');
        
    })

    // Negative Test Case
    it('should not be allowed to register new user as validation fails', () => {
        cy.visit(Url)

        cy.get('a[href="/login"]').click()

        cy.get('input[data-qa="signup-name"]').type('invalidname');
        cy.get('input[data-qa="signup-email"]').type('invaliduser4-example.com');

        
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('input[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;   
            expect($input[0].validationMessage).to.eq('Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "invaliduser4-example.com" fehlt ein @-Zeichen.');
        });

    });

})