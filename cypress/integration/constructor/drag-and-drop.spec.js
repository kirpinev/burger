import { AppRoutes } from "../../../src/enums/app-routes";

describe("Drag and Drop", () => {
  before(() => {
    cy.visit(AppRoutes.MainPage);
    cy.wait(2000);
  });

  it("корректно добавляет булочку в конструктор", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]")
      .find("ul")
      .eq(0)
      .find("li")
      .first()
      .trigger("dragstart");

    cy.get("[class^=empty-constructor_emptyContainer]").trigger("drop");

    cy.get(".constructor-element_pos_top").should("exist");
    cy.get(".constructor-element_pos_bottom").should("exist");
  });

  it("корректно добавляет соус в конструктор", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]")
      .find("ul")
      .eq(1)
      .find("li")
      .first()
      .trigger("dragstart");

    cy.get("[class^=burger-constructor_burgerConstructor]").trigger("drop");

    cy.get("[class^=burger-constructor_ingredientsList]")
      .find(">div")
      .should("have.length", 1);
  });

  it("корректно добавляет начинку в конструктор", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]")
      .find("ul")
      .eq(2)
      .find("li")
      .first()
      .trigger("dragstart");

    cy.get("[class^=burger-constructor_burgerConstructor]").trigger("drop");

    cy.get("[class^=burger-constructor_ingredientsList]")
      .find(">div")
      .should("have.length", 2);
  });

  it("конструктор должен содержать 4 ингредиента", () => {
    cy.get(".constructor-element_pos_top").should("exist");
    cy.get(".constructor-element_pos_bottom").should("exist");

    cy.get("[class^=burger-constructor_ingredientsList]")
      .find(">div")
      .should("have.length", 2);
  });
});
