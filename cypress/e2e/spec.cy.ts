describe("Cypress works", () => {

  it("open browser", () => {
    cy.visit("https://github.com", { timeout: 30000 });
    cy.url().then(url => {
      expect(url).to.equal("https://github.com/");
    })
  });

});
