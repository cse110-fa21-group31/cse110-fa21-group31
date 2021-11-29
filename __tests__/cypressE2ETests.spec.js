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

    // const recipesAvailable = cy.get("recipe-card");
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

    // Spoof Google's API (gapi) and log in as a fake user.
    // To do this, construct a fake gapi object and use it to
    // mock out the gapi.auth2.getAuthInstance() call.
    /*
        const profile = {
            username: googleUser.getBasicProfile().getName(),
            imageURL: googleUser.getBasicProfile().getImageUrl(),
            email: googleUser.getBasicProfile().getEmail(),
            _id: "MMAfv3oCQDiL4u10",
            savedRecipe: ["VZsAA6HuzytdIQT2"],
            myRecipe: ["AJlpmnCbp6gry18v", "uYaCV6U4XGfQHYg2"],
        };
    */
    /*
        Should spoof the following methods:
        googleUser.getBasicProfile().getName(),
        googleUser.getBasicProfile().getImageUrl(),
        googleUser.getBasicProfile().getEmail(),
    */
});