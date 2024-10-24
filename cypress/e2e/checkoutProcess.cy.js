import { userRegistration } from "../support/userRegistrationHelpers";
import { userDetails } from "../support/commonHelpers";
import { loginUser } from "../support/userLoginHelpers";
import { searchManageProduct } from "../support/productSearchHelpers";
import { checkoutProduct } from "../support/checkoutHelpers";

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
        searchManageProduct.manage();
        checkoutProduct.manageCheckout();
        cy.deleteUserAccount();
    });
});