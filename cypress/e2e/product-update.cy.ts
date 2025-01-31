import "@testing-library/cypress";

describe("Products modifification", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("Adds a new movie", () => {
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();

    cy.url().should("include", "/");
    cy.wait(2000);

    cy.get("[data-cy='wishlist-url']").click();
    cy.wait(1000);

    cy.url().should("include", "/wishlist-form");

    cy.get("[data-cy='wishlist-email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='movie-name-input']").type("My Neighbor Totoro");
    cy.get("[data-cy='movie-type-select']").select('Animation').should("be.visible");
    cy.get("[data-cy='movie-language-select']").select('Spanish').should("be.visible");

    cy.get("[data-cy='movie-released-year']").type("1988");
    cy.get("[data-cy='wishlist-img']").type("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRKeGEyHghdsmKRFfovvPwgNaZ9eDwgwPx2omhPeQ0vI-VGRbf_y8h9c-sUkdPPLFd7R3hqoA")
    cy.get("[data-cy='wishlist-comment']").type("please, add this movie");

    cy.get("[data-cy='add-product-btn']").click();

    cy.findAllByText("Thank you for your submission!").should("be.visible");
    cy.wait(8000);

    cy.get("[data-cy='wishlist-page-url']").click();
    cy.url().should("include", "/wishlist");

    cy.wait(5000);

    cy.get("[data-cy='wishlist-movie-item']").last().findByText("My Neighbor Totoro");
  });

  it("Modifies movie details", () => {
    cy.wait(3000);
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();

    cy.url().should("include", "/");
    cy.wait(2000);

    cy.get("[data-cy='wishlist-url']").click();
    cy.url().should("include", "/wishlist-form");

    cy.get("[data-cy='wishlist-page-url']").click();
    cy.url().should("include", "/wishlist");

    cy.wait(5000);

    cy.get("[data-cy='wishlist-movie-item']")
      .last()
      .find("[data-cy='edit-cart-btn']")
      .click();

    cy.get("[data-cy='edit-language-input']").select("English").should('be.visible')
    cy.get("[data-cy='save-cart-btn']").click()
    cy.wait(500);
    cy.get("[data-cy='wishlist-language']").last().findByText("English").should("be.visible");
  });
  it("Deletes movie from the wishlist", () => {
    cy.wait(3000);
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='email-input']").type("g_lemonjava@cu.edu.ge");
    cy.get("[data-cy='password-input']").type("Hello321.");

    cy.get("[data-cy='sign-in-btn']").click();

    cy.url().should("include", "/");
    cy.wait(2000);

    cy.get("[data-cy='wishlist-url']").click();
    cy.url().should("include", "/wishlist-form");

    cy.get("[data-cy='wishlist-page-url']").click();
    cy.url().should("include", "/wishlist");

    cy.wait(5000);


    cy.get("[data-cy='wishlist-movie-item']")
      .last()
      .find("[data-cy='delete-cart-btn']")
      .click();


    cy.wait(500);
    cy.get("[data-cy='wishlist-movie-item']").last().findByText("My Neighbor Totoro").should("not.exist");
  });
});
