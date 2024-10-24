export const baseUrl = 'https://www.automationexercise.com';

export const productName = "Dress";

export const userDetails = {
    name: 'testusers',
    email: 'testusers1233@example.com',
    password: 'password123',
};

export const navigateToLogin = () => {
    /** Navigates to the signup/login page */

    cy.visit(baseUrl);
    cy.wait(2000);
    cy.contains("AutomationExercise").should('be.visible');
    cy.get('a[href="/login"]').click();
    cy.get('button[data-qa="login-button"]').should('be.visible');
    cy.get('button[data-qa="signup-button"]').should('be.visible');
};

export const generateRandomNumber = (length) => {
    /** Generate a random number */
    
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const generateRandomDate = () => {
    /** Generate a raondom date */

    const day = Math.floor(Math.random() * 28) + 1; 
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * 30) + 1980;
    return { day, month, year };
};