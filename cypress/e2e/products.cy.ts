describe("Products Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a table with data", () => {
    cy.get("#view-product-button").should("be.visible");
    cy.get("#edit-product-button").should("be.visible");
    cy.get("#delete-product-button").should("be.visible");
  });

  it("should type in search and display results", () => {
    const searchText = "HP";
    cy.get("#search-input").type(searchText);
    cy.get('[data-cy="product-title"]').should("contain.text", "HP");
  });

  // it("should create a product", () => {
  //   cy.get("#create-product-button").click();
  //   cy.get("#title").should("have.text", "Criar Produto");
  // });
});

describe("Create Product", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create a product", () => {
    cy.get("#create-product-button").click();
    cy.get("#title").should("have.text", "Criar Produto");
    cy.get("#title-input").type("Notebook");
    cy.get("#brand-input").type("Razer");
    cy.get("#description-input").type("Notebook Gamer");
    cy.get("#price-input").type("R$ 7.999,99");
    cy.get("#discount-percentage-input").type("9,90 %");
    cy.get("#category-input").select("laptops");
    cy.get("#rating-input").type("8,90");
    cy.get("#stock-input").type("199");
  });
});
