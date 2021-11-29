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
        // look for an input element wiht the id "searchBar"
        cy.get("#searchBar").should("be.visible");
    });
    it("Can see recipes at the bottom v2", () => {
        // the custom html elements 'recipe-card' should be below
        cy.get("recipe-card").should("be.visible");
        cy.get("recipe-card").should("have.length", 4);
    });
    it("Default recipes should be there", () => {
        // Here are the individual shadow doms recipe names:
        // "pumpkin pie", "chicken fajitas", "halloween cookie bars", "christmas cake"
        // Make sure to check each individual shadow dom exists. They will ALL be a "recipe-card".
        // Make sure there is at least one recipe card for each recipe name.
        cy.get("recipe-card", shadowconfig)
            .should("be.visible")
            .should("have.length", 4)
            .then(console.log);
    });
});