// Cypress end-to-end testing

const shadowconfig = {
    matchCase: false,
    includeShadowDom: true,
};

describe("Cypress Pipeline v2", () => {
    it("Loads home page by default", () => {
        cy.visit("http://localhost:3030");
    });
    it("Can see loaded images", () => {
        cy.get("img");
    });
    it("Can see the search bar", () => {
        cy.get("#searchBar").should("be.visible");
    });
    it("Can see recipes at the bottom", () => {
        cy.get("recipe-card").should("be.visible");
        cy.get("recipe-card").should("have.length.greaterThan", 0);
    });

    it("Should bring up details page when clicking a recipe card", () => {
        cy.get("recipe-card").first().click();
        cy.get("#descStuff");
        cy.get("#steps");
        cy.get("#description");
        cy.get("#tags");
    });
    
    it("Should allow editing of recipe", () => {
        cy.get("#editRecipeButton").click();
        cy.get("#editRecipe").should("be.visible");
        cy.get("#editRecipeForm").should("be.visible");
    });
});