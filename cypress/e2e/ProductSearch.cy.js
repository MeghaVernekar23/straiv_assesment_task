describe('Product Search on Automation Exercise', () => {

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
        cy.get('a[href="/products"]').click();
        cy.get('input[id=search_product]').type('Dress');
        cy.get('button[id=submit_search]').click();
        cy.contains('Sleeves Top and Short - Blue & Pink').should('be.visible');
    });

    it.only('Should view and manage a product after searching it', () => {
        cy.get('a[href="/products"]').click();
        cy.get('input[id=search_product]').type('Dress');
        cy.get('button[id=submit_search]').click();
        cy.wait(1000);
        cy.contains('Searched Products').should('be.visible');
        cy.contains('Sleeves Top and Short - Blue & Pink').should('be.visible');
        cy.get('a[href="/product_details/16"]').click();
        cy.contains('Rs. 478').should('be.visible');
        cy.get('input[id="quantity"]').should('have.value', '1');
        cy.contains('button', 'Add to cart').click();
        cy.contains('Added!').should('be.visible');
        cy.contains('Your product has been added to cart.').should('be.visible');
    });
});
