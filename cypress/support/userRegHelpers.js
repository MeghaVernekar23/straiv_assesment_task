export const Url = 'https://www.automationexercise.com';

export const deleteUserAccount = () => {
    cy.get('a[href="/delete_account"]').click();
    cy.get('a[data-qa="continue-button"]').click();
};