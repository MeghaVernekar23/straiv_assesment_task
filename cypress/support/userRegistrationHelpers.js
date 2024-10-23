import { baseUrl } from "./commonHelpers";

const generateRandomNumber = (length) => {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const generateRandomDate = () => {
    const day = Math.floor(Math.random() * 28) + 1; 
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * 30) + 1980;
    return { day, month, year };
};

export const navigateToLogin = () => {
    /** Navigates to the signup/login page */
    cy.visit(baseUrl);
    cy.contains("AutomationExercise").should('be.visible');
    cy.get('a[href="/login"]').click();
    cy.get('button[data-qa="login-button"]').should('be.visible');
    cy.get('button[data-qa="signup-button"]').should('be.visible');

};

export const registerUser = (userName, userEmail, include_optional_fields=true) => {
    /** Creates a new account for a unique user */

    const randomMobile = generateRandomNumber(10);
    const randomDate = generateRandomDate();

    cy.get('input[data-qa="signup-name"]').type(userName);
    cy.get('input[data-qa="signup-email"]').type(userEmail);        
    cy.get('button[data-qa="signup-button"]').click();

    cy.wait(1000);
    cy.contains('Enter Account Information').should('be.visible');

    if (include_optional_fields == true){
        cy.get('#id_gender1').check();
        cy.get('input[data-qa="company"]').type('Test Company');
    }
    cy.get('input[data-qa="password"]').type("password123");
    cy.get('select[data-qa="days"]').select(randomDate.day.toString());
    cy.get('select[data-qa="months"]').select(randomDate.month.toString());
    cy.get('select[data-qa="years"]').select(randomDate.year.toString());

    cy.get('input[id="newsletter"]').check();
    cy.get('input[id="optin"]').check();
    cy.get('input[data-qa="first_name"]').type('John');
    cy.get('input[data-qa="last_name"]').type('Doe');
    cy.get('input[data-qa="company"]').type('Test Company');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('select[data-qa="country"]').select('Australia');
    cy.get('input[data-qa="state"]').type('Sydney');
    cy.get('input[data-qa="city"]').type('City_1');
    cy.get('input[data-qa="zipcode"]').type('90210');
    cy.get('input[data-qa="mobile_number"]').type(randomMobile);

    cy.get('button[data-qa="create-account"]').click();
    cy.wait(1000);
    cy.contains('Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();
    cy.wait(1000);
    cy.contains(`Logged in as ${userName}`).should('be.visible');
};

export const fillSignUpForm = (username, useremail) => {
    /** Fills the signup form before the user account form is created */

    cy.get('input[data-qa="signup-name"]').type(username);
    cy.get('input[data-qa="signup-email"]').type(useremail); 
    cy.get('button[data-qa="signup-button"]').click();
}

export const logoutUser = () => {
    /** Logs out the user */

    cy.get('a[href="/logout"]').click();
}