// Cypress end-to-end testing
const shadowconfig = {
    matchCase: false,
    includeShadowDom: true,
};

const recipeDetailPageVisible = () => {
    cy.get("#recipeDetail").should("not.have.css", "display", "none");
}
const recipeCreatePageVisible = () => {
    cy.get('#createRecipe').should("not.have.css", "display", "none");
}
const recipeEditPageVisible = () => {
    cy.get('#editRecipe').should("not.have.css", "display", "none");
}
const landingPageVisible = () => {
    cy.get('#landingPage').should("not.have.css", "display", "none");
}
const userPageVisible = () => {
    cy.get('#userInfo').should("not.have.css", "display", "none");
}

const goToDetailPage = (recipeId) => {
    // cy.get("#submit").click();
    cy.frameLoaded();
    cy.iframe().contains("Save").click();
    // cy.contains("Save").click();
    recipeDetailPageVisible();
}

describe("Can do CRUD functionality", () => {
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
    it("shows the profile", () => {
        // it should have a img, AND shouldn't have display: none
        cy.get("#profile").find("img").should("have.attr", "src");
        cy.get("#profile").should("not.have.css", "display", "none");
    });
    it("show the profile page upon click", () => {
        // upon click, #userInfo shouldn't have display: none
        cy.get("#profile").click();
        cy.get("#userInfo").should("not.have.css", "display", "none");
    });


    // CREATING A NEW RECIPE
    it("shows new recipe creation page upon clicking New Recipe", () => {
        cy.contains("New Recipe").click();
        recipeCreatePageVisible();
    });
    it("should not allow saving a recipe if it lacks the required fields", () => {
        // cy.get('#recipeForm > :nth-child(10) > #submit > input').click();
        goToDetailPage();
        cy.get("#createRecipe").should("not.have.css", "display", "none");
        cy.get(".recipeEdit").should("not.have.css", "display", "none");
        cy.get("#recipeDetail").should("have.css", "display", "none");
    });
    it("should be able to input recipe info and successfully make a new recipe", () => {
        // Fill out the following fields:
        // name, description, tags (a comma-delimited string), cook time, serving size, difficulty (dropdown menu from 1 to 5 stars)
        cy.get("#name").type("Test Recipe");
        cy.get("#descriptionText").type("This is a test recipe");
        cy.get('#recipeForm > :nth-child(4) > #tags').type("testtag, testtag2, testtag3");
        cy.get('#cookTime > #prepTime').type("10");
        cy.get('#recipeForm > :nth-child(6) > #servingSize').type("1");
        cy.get('#recipeForm > :nth-child(7) > #difficulty').select("5");
        // click add ingredient and wait for a new input text element to be created
        // it will have an ID of "newInputBox" and its name will be "ingredient#" where '#' is the number of the ingredient
        // it will also create a similar
        // do this a random number of times
    });
    it("should be able to change ingredients by adding and deleting", () => {
        let amountOfIngredients = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < amountOfIngredients; i++) {
            cy.get('#recipeForm > #ingredients > :nth-child(2) > #addIngr').click();
            cy.get(`#newInputBox[name=ingredient${i}]`).type("t" + i);
            cy.get(`#newInputBox[name=ingredientAmount${i}]`).type("a" + i);
        }
        // at the end, there should be amountOfIngredients amount of ingredient inputs
        cy.get("#newIngredientId").children().should("have.length", amountOfIngredients);

        let amountOfIngredientsDeleted = Math.floor(Math.random() * 1) + 1;
        for (let i = 0; i < amountOfIngredientsDeleted; i++) {
            cy.get('#recipeForm > #ingredients > :nth-child(2) > #delIngr').click();
        }
        cy.get("#newIngredientId").children().should("have.length", amountOfIngredients - amountOfIngredientsDeleted);
    });
    it("should be able to change steps by adding and deleting", () => {
        // click add step and wait for a new input text element to be created
        // it will have an ID of "textAreaBox" and its name will be "step#" where '#' is the number of the step
        let amountOfSteps = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < amountOfSteps; i++) {
            cy.get('#recipeForm > #steps > #addSteps > #addStep').click();
            cy.get(`#textAreaBox[name=step${i}]`).type("s" + i);
        }
        cy.get("#newStepId").children().should("have.length", amountOfSteps);

        let amountOfStepsDeleted = Math.floor(Math.random() * 1) + 1;
        for (let i = 0; i < amountOfSteps; i++) {
            cy.get('#recipeForm > #steps > #addSteps > #delStep').click();
        }
        cy.get("#newStepId").children().should("have.length", amountOfSteps - amountOfStepsDeleted);
    });
    it("should successfully submit the new recipe", () => {
        // cy.get('#recipeForm > :nth-child(10) > #submit > input').click();
        goToDetailPage();
        cy.get("#recipeDetail").should("not.have.css", "display", "none");
    })


    // EDITING A RECIPE
    it("should be able to edit the recipe", () => {
        cy.get('#editRecipeButton').click();
        recipeEditPageVisible();
        cy.get('#editName > #name').type(" (Edited)");
        cy.get('#editDescription > #descriptionText').type(" (Edited)");
        cy.get('#editTags > #tags').type(", editedtesttag, editedtesttag2, editedtesttag3");
        // cy.get('#editRecipeForm > :nth-child(10) > #submit > input').click();
        goToDetailPage();
        
        recipeDetailPageVisible();
        cy.get('#recipeTitle').should("contain", "(Edited)");
        cy.get('#description').should("contain", "(Edited)");
    })
    it("should have its edits be seen", () => {

    })


    //

    // DISQUS
    it("should be able to comment on the recipe", () => {
        cy.scrollTo('bottom');
        // cy.getIframeBody().find()
        cy.get('#disqus_thread').should("not.have.css", "display", "none");
    })
});