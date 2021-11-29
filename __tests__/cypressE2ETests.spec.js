// Cypress end-to-end testing

describe("Cypress Pipeline v2", () => {
    it("Loads home page by default", () => {
        cy.visit("http://localhost:3030");
    })
    it("Can see loaded images", () => {
        cy.get("img");
    })
    it("Can see the search bar", () => {
        // look for an input element wiht the id "searchBar"
        cy.get("#searchBar").should("be.visible");
    })
    it("Can see recipes at the bottom v2", () => {
        // the custom html elements 'recipe-card' should be below
        cy.get("recipe-card").should("be.visible");
    })
    it("Default recipes should be there", () => {
        // use contains(), but also include shadow doms
        cy.get("recipe-card").contains("Pumpkin Pie", {
            matchCase: false,
            includeShadowDom: true
        }); 
        cy.get("recipe-card").contains("Chicken Fajitas", {
            matchCase: false,
            includeShadowDom: true
        }); 
        cy.get("recipe-card").contains("Halloween Cookie Bars", {
            matchCase: false,
            includeShadowDom: true
        }); 
        cy.get("recipe-card").contains("Christmas Cake", {
            matchCase: false,
            includeShadowDom: true
        }); 
    })
})