class CheckoutProduct{
    
    payment(){
        /** Opens the payment page and tries to buy the product */

        cy.get('a[href="/payment"]').click();
        cy.get('input[data-qa="name-on-card"]').type("TestUser");
        cy.get('input[data-qa="card-number"]').type("1234 2341 1231 2321");
        cy.get('input[data-qa="cvc"]').type("123");
        cy.get('input[data-qa="expiry-month"]').type("1");
        cy.get('input[data-qa="expiry-year"]').type("1991");
        cy.contains('button', 'Pay and Confirm Order').click();
    }

    proceedCheckout(){
        /** Item exists in cart and is further processed  */

        cy.contains('Proceed To Checkout').should('be.visible');
        cy.contains('a', 'Proceed To Checkout').click();
        cy.contains('Your billing address').should('be.visible');
        cy.contains('Your delivery address').should('be.visible');
        cy.contains('Review Your Order').should('be.visible');
    }

    addedToCart(){
        /** Products added to cart are viewed */

        cy.get('#cartModal').should('have.class', 'show');
        cy.get('#cartModal').should('be.visible');
        cy.get('.modal.show').within(() => {
            cy.get('a[href="/view_cart"]').click();
        });
        cy.contains('Item').should('be.visible');
        cy.contains('Description').should('be.visible');
        cy.contains('Quantity').should('be.visible');
    }

    generateInvoice(){
        /** Chekc whether an invoice can be downloaded after successfull payment */

        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.contains('Download Invoice').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
    }

    manageCheckout(){
        this.addedToCart();
        this.proceedCheckout();
        this.payment();
        this.generateInvoice();
    }

}

export const checkoutProduct = new CheckoutProduct();