// Cypress end-to-end testing
const shadowconfig = {
    matchCase: false,
    includeShadowDom: true,
};

describe("Works with a google account signin", () => {
    it("should log in with google api", () => {
        // cy.task('db:seed');
        cy.loginByGoogleApi();
    });
    
    const fakeGoogleUser = {
        getBasicProfile: () => {
            return {
                getName: () => {
                    return "Test User";
                },
                getImageUrl: () => {
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png";
                },
                getEmail: () => {
                    return "testguy@fakeemail.com";
                },
            };
        },
    };

    it("should have assigned a custom function 'onSignIn' to the window object", () => {
        cy.window().then((win) => {
            expect(win.onSignIn).to.be.a("function");
            win.onSignIn(fakeGoogleUser);
        });
    })
    it("show the profile page upon click", () => {
        // upon click, #userInfo shouldn't have display: none
        cy.get('.profileImage').click();
        cy.get("#userInfo").should("not.have.css", "display", "none");
    });
    it("shows new recipe creation page upon clicking New Recipe", () => {
        cy.contains("New Recipe").click();
        cy.get("#createRecipe").should("not.have.css", "display", "none");
        cy.get(".recipeEdit").should("not.have.css", "display", "none");
    });

    // TODO: get these working with cypress-iframe plugin
    it.skip("should not allow saving a recipe if it lacks the required fields", () => {
        cy.contains("Save").click();
        cy.get("#createRecipe").should("not.have.css", "display", "none");
        cy.get(".recipeEdit").should("not.have.css", "display", "none");
        cy.get("#recipeDetail").should("have.css", "display", "none");
    })
    it.skip("should be able to input recipe info and successfully make a new recipe", () => {
        // Fill out the following fields:
        // name, description, tags (a comma-delimited string), cook time, serving size, difficulty (dropdown menu from 1 to 5 stars)
        cy.get("#name").type("Test Recipe");
        cy.get("#descriptionText").type("This is a test recipe");
        cy.get("#tags").type("testtag, testtag2, testtag3");
        cy.get("#cookTime").type("10");
        cy.get("#servingSize").type("1");
        cy.get("#difficulty").select("5");
        // click add ingredient and wait for a new input text element to be created
        // it will have an ID of "newInputBox" and its name will be "ingredient#" where '#' is the number of the ingredient
        // it will also create a similar
        // do this a random number of times
        let amountOfIngredients = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < amountOfIngredients; i++) {
            cy.get("#addIngr").click();
            cy.get("#newInputBox").should("have.attr", "name", "ingredient" + i).type("Test Ingredient " + i);
            cy.get("#newInputBox").should("have.attr", "name", "ingredientAmount" + i).type("Some amount, " + i);
        }
        // at the end, there should be amountOfIngredients amount of ingredient inputs
        cy.get("#newInputBox").should("have.length", amountOfIngredients);

        // click add step and wait for a new input text element to be created
        // it will have an ID of "textAreaBox" and its name will be "step#" where '#' is the number of the step
        let amountOfSteps = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < amountOfSteps; i++) {
            cy.get("#addStep").click();
            cy.get("#textAreaBox").should("have.attr", "name", "step" + i).type("Test Step " + i);
        }
        cy.get("#textAreaBox").should("have.length", amountOfSteps);

        cy.contains("Save").click();
        cy.get("#recipeDetail").should("not.have.css", "display", "none");
    })
})
