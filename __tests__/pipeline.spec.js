// Cypress end-to-end testing

describe("cypress pipeline test", () => {
    it("successfully loads", () => {
        cy.visit("index.html");
    })
})