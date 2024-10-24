import { productName } from "./commonHelpers";

class SearchManageProduct{
    
    constructor(productName) { 
        this.productName = productName; 
    }
    
    search() {
        /** Product is searched from the search bar */
        
        cy.get('a[href="/products"]').click();
        cy.get('input[id=search_product]').type(this.productName);
        cy.get('button[id=submit_search]').click();
    }

    manage() {
        /** Product is searched and its details are listed */

        this.search(this.productName);
        cy.wait(1000);
        cy.contains('Searched Products').should('be.visible');
        cy.contains('Sleeves Top and Short - Blue & Pink').should('be.visible');
        cy.get('a[href="/product_details/16"]').click();
        cy.contains('Rs. 478').should('be.visible');
        cy.get('input[id="quantity"]').should('have.value', '1');
        cy.contains('button', 'Add to cart').click();
        cy.contains('Added!').should('be.visible');
        cy.contains('Your product has been added to cart.').should('be.visible');
    }
}

export const searchManageProduct = new SearchManageProduct(productName);
