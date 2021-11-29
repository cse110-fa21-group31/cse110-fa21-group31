// testing.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// EUVIN: this file is for exploratory stuff in cypress, don't mind
describe("Cypress Pipeline v2", () => {
    it.skip("Loads home page by default", () => {
        cy.visit("http://localhost:3030");
        cy.get('.abcRioButtonContentWrapper').click();
        
    });
});
