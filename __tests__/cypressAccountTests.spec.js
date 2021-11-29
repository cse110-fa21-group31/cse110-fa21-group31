// Cypress end-to-end testing
const shadowconfig = {
    matchCase: false,
    includeShadowDom: true,
};

describe("Works with a google account signin", () => {
    beforeEach(() => {
        // cy.task('db:seed');
        cy.loginByGoogleApi();
    })

    it("shows the profile", () => {
        
    })
})
