// export const userName = "testusers";
// export const userEmail = "testusers1233@example.com";
// export const userPassword = "password123";
export const baseUrl = 'https://www.automationexercise.com';

export const user = {
    name: 'testusers',
    email: 'testusers1233@example.com',
    password: 'password123',
};

export const navigateToLogin = () => {
    /** Navigates to the signup/login page */

    cy.visit(baseUrl);
    cy.contains("AutomationExercise").should('be.visible');
    cy.get('a[href="/login"]').click();
    cy.get('button[data-qa="login-button"]').should('be.visible');
    cy.get('button[data-qa="signup-button"]').should('be.visible');
};