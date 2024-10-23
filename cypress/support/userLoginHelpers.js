

export const logInUser = (username, password) => {

    cy.get('input[data-qa="login-email"]').type(username);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
}

