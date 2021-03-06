// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import 'cypress-iframe';

Cypress.Commands.add("loginByGoogleApi", () => {
    cy.log("Logging in to Google");

    console.log(Cypress.env("googleClientId"));
    console.log(Cypress.env("googleClientSecret"));
    console.log(Cypress.env("googleRefreshToken"));
    cy.log("client:" + Cypress.env("googleClientId"));
    cy.log("secret:" + Cypress.env("googleClientSecret"));
    cy.log("token:" + Cypress.env("googleRefreshToken"));

    cy.request({
        method: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        body: {
            grant_type: "refresh_token",
            client_id: Cypress.env("googleClientId"),
            client_secret: Cypress.env("googleClientSecret"),
            refresh_token: Cypress.env("googleRefreshToken"),
        },
    }).then(({ body }) => {
        const { access_token, id_token } = body;

        cy.request({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/userinfo",
            headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
            cy.log(body);
            const userItem = {
                token: id_token,
                user: {
                    googleId: body.sub,
                    email: body.email,
                    givenName: body.given_name,
                    familyName: body.family_name,
                    imageUrl: body.picture,
                },
            };

            window.localStorage.setItem(
                "googleCypress",
                JSON.stringify(userItem)
            );
            cy.visit("/");
        });
    });
});

Cypress.Commands.add("getIframeBody", () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.log("getIframeBody");

    return (
        cy
            .get('iframe[data-cy="the-frame"]', { log: false })
            .its("0.contentDocument.body", { log: false })
            .should("not.be.empty")
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            // https://on.cypress.io/wrap
            .then((body) => cy.wrap(body, { log: false }))
    );
});
