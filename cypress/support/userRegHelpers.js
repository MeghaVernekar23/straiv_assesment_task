export const Url = 'https://www.automationexercise.com';

export const deleteUserAccount = () => {
    cy.get('a[href="/delete_account"]').click();
    cy.get('a[data-qa="continue-button"]').click();
};

export const navigateToLogin = () => {
    cy.visit(Url);
    cy.get('a[href="/login"]').click();
};

export const fillSignupForm = (username, useremail) => {
    cy.get('input[data-qa="signup-name"]').type(username);
    cy.get('input[data-qa="signup-email"]').type(useremail);        
    cy.get('button[data-qa="signup-button"]').click();
};