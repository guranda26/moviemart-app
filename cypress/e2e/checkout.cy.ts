import "@testing-library/cypress";

describe("Product purchase", () => {
  beforeEach(() => {
    cy.visit("/home");

    cy.intercept("POST", "/api/checkout-session", {
      fixture: "payment_intent.json",
    }).as("handler");

    cy.intercept("POST", "/success-order?*", {
      body: {
        error: false,
      },
    }).as("confirmPayment");
  });

  it("Can complete a product purchase", () => {
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();
    cy.wait(3000);

    cy.url().should("include", "/");

    cy.get("[data-cy='product-item']")
      .last()
      .click();


    cy.wait(4000);

    cy.get("[data-cy='buy-product-btn']").click()


    cy.wait(5000);
    cy.findAllByText("Payment Successful!").should("be.visible");


  });

});
