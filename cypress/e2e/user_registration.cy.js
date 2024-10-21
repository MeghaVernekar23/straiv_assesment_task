describe('User Registration', () => {
    it('should register a new user', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.get('a[href="/login"]').click()

        cy.get('input[data-qa="signup-name"]').type('invalidname');
        cy.get('input[data-qa="signup-email"]').type('invaliduser4@example.com');

        
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
        cy.get('a[href="/delete_account"]').click()
        cy.get('a[data-qa="continue-button"]').click();
    })
})