import { userRegistration } from "../support/userRegistrationHelpers";
import { userDetails } from "../support/commonHelpers";
import { loginUser } from "../support/userLoginHelpers";

describe('Checkout product process', () => {

    beforeEach(() => {
        cy.navigatelogin();
    });

    it('Should verify the home page is visible successfully', () => {
        cy.contains('Home').should('be.visible');
    });

    it('Should add a product to the cart and navigate to the cart page', () => {
        userRegistration.registerUser(userDetails.name, userDetails.email, false)
        cy.logout();
        cy.navigatelogin();
        loginUser(userDetails.email, userDetails.password);
        cy.wait(1000);
        cy.contains(`Logged in as ${userDetails.name}`).should('be.visible');
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

        cy.get('#cartModal').should('have.class', 'show');
        cy.get('#cartModal').should('be.visible');
        cy.get('.modal.show').within(() => {
            cy.get('a[href="/view_cart"]').click();
        });

        cy.contains('Item').should('be.visible');
        cy.contains('Description').should('be.visible');
        cy.contains('Quantity').should('be.visible');
        
        cy.contains('Proceed To Checkout').should('be.visible');
        cy.contains('a', 'Proceed To Checkout').click();
        
        cy.contains('Your billing address').should('be.visible');
        cy.contains('Your delivery address').should('be.visible');
        cy.contains('Review Your Order').should('be.visible');
        cy.get('a[href="/payment"]').click();
        cy.get('input[data-qa="name-on-card"]').type("TestUser");
        cy.get('input[data-qa="card-number"]').type("1234 2341 1231 2321");
        cy.get('input[data-qa="cvc"]').type("123");
        cy.get('input[data-qa="expiry-month"]').type("1");
        cy.get('input[data-qa="expiry-year"]').type("1991");

        cy.contains('button', 'Pay and Confirm Order').click();
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.contains('Download Invoice').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
        cy.deleteUserAccount();
    });
});