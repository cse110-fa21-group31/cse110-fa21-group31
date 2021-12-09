// Cypress end-to-end testing
const shadowconfig = {
    matchCase: false,
    includeShadowDom: true,
};

const recipeDetailPageVisible = () => {
    cy.get("#recipeDetail").should("not.have.css", "display", "none");
};
const recipeCreatePageVisible = () => {
    cy.get("#createRecipe").should("not.have.css", "display", "none");
};
const recipeEditPageVisible = () => {
    cy.get("#editRecipe").should("not.have.css", "display", "none");
};
const landingPageVisible = () => {
    cy.get("#landingPage").should("not.have.css", "display", "none");
};
const userPageVisible = () => {
    cy.get("#userInfo").should("not.have.css", "display", "none");
};

const clickSave = () => {
    cy.get("[data-cy=savebutton]").filter(":visible").click();
};

describe("End to end test", () => {
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

    it("should log in with google api", () => {
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
    });
    it("show the profile page upon click", () => {
        cy.get(".profileImage").click();
        cy.get("#userInfo").should("not.have.css", "display", "none");
    });

    // CREATING A NEW RECIPE
    it("shows new recipe creation page upon clicking New Recipe", () => {
        cy.contains("New Recipe").click();
        recipeCreatePageVisible();
    });
    it("should not allow saving a recipe if it lacks the required fields", () => {
        clickSave();
        recipeCreatePageVisible();
    });
    it("should be able to input recipe info and successfully make a new recipe", () => {
        cy.get("[data-cy=recipenamefield]").type("Test Recipe");
        cy.get("[data-cy=recipedescfield]").type("This is a test recipe");
        cy.get("[data-cy=recipetags]").type(
            "testtag, testtag2, testtag3"
        );
        cy.get("[data-cy=recipecooktime]").type("10");
        cy.get("[data-cy=recipeservingsize]").type("1");
        cy.get("[data-cy=recipedifficulty]").select("5");
    });
    it("should be able to change ingredients by adding and deleting", () => {
        let amountOfIngredients = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < amountOfIngredients; i++) {
            cy.get(
                "#recipeForm > #ingredients > :nth-child(2) > #addIngr"
            ).click();
            cy.get(`#newInputBox[name=ingredient${i}]`).type("t" + i);
            cy.get(`#newInputBox[name=ingredientAmount${i}]`).type("a" + i);
        }
        cy.get("[data-cy=newingredient]")
            .children()
            .should("have.length", amountOfIngredients);

        let amountOfIngredientsDeleted = Math.floor(Math.random() * 1) + 1;
        for (let i = 0; i < amountOfIngredientsDeleted; i++) {
            cy.get(
                "#recipeForm > #ingredients > :nth-child(2) > #delIngr"
            ).click();
        }
        cy.get("[data-cy=newingredient]")
            .children()
            .should(
                "have.length",
                amountOfIngredients - amountOfIngredientsDeleted
            );
    });
    it("should be able to change steps by adding and deleting", () => {
        let amountOfSteps = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < amountOfSteps; i++) {
            cy.get("#recipeForm > #steps > #addSteps > #addStep").click();
            cy.get(`#textAreaBox[name=step${i}]`).type("s" + i);
        }
        cy.get("[data-cy=newstep]").children().should("have.length", amountOfSteps);

        let amountOfStepsDeleted = Math.floor(Math.random() * 1) + 1;
        for (let i = 0; i < amountOfStepsDeleted; i++) {
            cy.get("#recipeForm > #steps > #addSteps > #delStep").click();
        }
        cy.get("[data-cy=newstep]")
            .children()
            .should("have.length", amountOfSteps - amountOfStepsDeleted);
    });
    it("should successfully submit the new recipe", () => {
        clickSave();
        recipeDetailPageVisible();
    });

    // EDITING A RECIPE
    it("should be able to edit the recipe", () => {
        cy.get("#editRecipeButton").click();
        recipeEditPageVisible();
        cy.get("#editName > #name").type(" (Edited)");
        cy.get("#editDescription > #descriptionText").type(" (Edited)");
        cy.get("#editTags > #tags").type(
            ", editedtesttag, editedtesttag2, editedtesttag3"
        );
        clickSave();
        recipeDetailPageVisible();
        cy.get("#recipeTitle").should("contain", "(Edited)");
        cy.get("#description").should("contain", "(Edited)");
    });
    it("should have its edits be seen", () => {});

    //

    // DISQUS
    it("should be able to comment on the recipe", () => {
        cy.scrollTo("bottom");
        cy.get("#disqus_thread").should("not.have.css", "display", "none");
    });
});
