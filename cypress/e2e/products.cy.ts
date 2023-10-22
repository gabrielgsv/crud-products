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
    cy.get("#thumbnail-input").selectFile("cypress/fixtures/testPicture.png", {
      force: true,
    });
    cy.get("#add-image-input").selectFile("cypress/fixtures/testPicture2.png", {
      force: true,
    });
    cy.get("#add-image-input").selectFile("cypress/fixtures/testPicture3.png", {
      force: true,
    });
    cy.get("#save-button").click();
    cy.get("#toast-1-title").should("have.text", "Sucesso");
  });
});

describe("Edit Product", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit a product", () => {
    cy.get('[href="/edit-product/1"] > #edit-product-button').click();
    cy.get("#title-input").should("have.length.greaterThan", 0);
    cy.get("#title-input").clear().type("Notebook");
    cy.get("#brand-input").clear().type("Razer");
    cy.get("#description-input").clear().type("Notebook gamer");
    cy.get("#price-input").clear().type("R$ 9.999,99");
    cy.get("#discount-percentage-input").clear().type("9,99 %");
    cy.get("#category-input").select("laptops");
    cy.get("#rating-input").clear().type("9,90");
    cy.get("#stock-input").clear().type("299");
    cy.get("#thumbnail-input").selectFile("cypress/fixtures/testPicture.png", {
      force: true,
    });
    cy.get("#remove-image-0").click();
    cy.get("#remove-image-0").click();
    cy.get("#remove-image-0").click();
    cy.get("#add-image-input").selectFile("cypress/fixtures/testPicture2.png", {
      force: true,
    });
    cy.get("#add-image-input").selectFile("cypress/fixtures/testPicture3.png", {
      force: true,
    });
    cy.get("#save-button").click();
    cy.get("#toast-1-title").should("have.text", "Sucesso");
    cy.get("#toast-1-description").should(
      "have.text",
      "Produto alterado com sucesso"
    );
  });
});

describe("View Product", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should view a product", () => {
    cy.get('[href="/product/1"] > #view-product-button').click();
    cy.get("#title").should("have.text", "Visualizar Produto");
    cy.get("#title-input").should("have.length.greaterThan", 0);
  });
});

describe("Delete Product", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete a product", () => {
    cy.get(":nth-child(1) > #product-actions > #delete-product-button").click();
    cy.get("#delete-modal-title").should("have.text", "Excluir Produto");
    cy.get("#delete-modal-description").should(
      "have.text",
      "Você tem certeza que deseja excluir este produto?"
    );
    cy.get("#delete-modal-confirm").click();
    cy.get("#toast-1-description").should(
      "have.text",
      "Produto excluído com sucesso"
    );
  });
});
