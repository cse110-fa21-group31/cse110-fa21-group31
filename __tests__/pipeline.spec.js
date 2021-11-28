// Cypress end-to-end testing

describe("Cypress Pipeline v2", () => {
    it("Loads home page by default", () => {
        cy.visit("/");
    })
    it("Can see recipes at the bottom", () => {
        cy.contains("Christmas Cake");
    })
})