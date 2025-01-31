describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/home");
  });
  it("Logs in successfully", () => {
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();

    cy.url().should("include", "/");
    cy.wait(1000);
  });

  it("Logs out users", () => {
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();

    cy.url().should("include", "/");
    cy.wait(3000);

    cy.get("[data-cy='log-out']").click();

    cy.url().should("include", "/home");
  });

});
