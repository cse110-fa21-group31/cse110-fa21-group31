// testing.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Cypress Pipeline v2", () => {
    it("Loads home page by default", () => {
        cy.visit("http://localhost:3030");
        cy.document().then((doc) => {
            console.log(doc.body.innerHTML);
        });
        cy.get('recipe-card').shadow().contains("Cake");
    })
})