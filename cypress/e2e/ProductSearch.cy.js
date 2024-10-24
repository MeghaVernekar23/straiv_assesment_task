import { searchManageProduct } from "../support/productSearchHelpers";

describe('Product Search and manage ', () => {

    beforeEach(() => {
        cy.navigatelogin();
    });

    it('Should verify the home page is visible successfully', () => {
        cy.contains('Home').should('be.visible');
    });

    it('Should navigate to PRODUCTS page successfully', () => {
        cy.get('a[href="/products"]').click();  
        cy.url().should('include', '/products');
        cy.contains('All Products').should('be.visible');
    });

    it('Should search for a product and verify search results', () => {
        searchManageProduct.search()
        cy.contains('Sleeves Top and Short - Blue & Pink').should('be.visible');
    });

    it('Should view and manage a product after searching it', () => {
        searchManageProduct.manage()
        cy.contains('button', 'Continue Shopping').click();
    });
});
