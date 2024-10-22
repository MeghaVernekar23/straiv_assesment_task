// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { navigateToLogin } from "../support/userRegHelpers"; 

Cypress.Commands.add('navigatelogin', () => { 
    navigateToLogin();
})

Cypress.Commands.add('logout', () => { 
    /** Logs out the user */
    cy.get('a[href="/logout"]').click();
})

Cypress.Commands.add('deleteUserAccount', () => {
    /** Deletes user account */ 
    cy.get('a[href="/delete_account"]').click();
    cy.get('a[data-qa="continue-button"]').click();
})

