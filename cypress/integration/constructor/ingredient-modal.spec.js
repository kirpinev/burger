import { AppRoutes } from "../../../src/enums/app-routes";

describe("Модальное окно ингредиента", () => {
  before(() => {
    cy.visit(AppRoutes.MainPage);
  });

  it("корректно открывается", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]")
      .find("li")
      .first()
      .find("li")
      .first()
      .as("bun")
      .click();

    cy.get("[class^=modal_modal]")
      .find("h4")
      .should("contain.text", "Детали ингредиента");
  });

  it("корректно отображает данные ингредиента", () => {
    cy.get("[class^=modal_modal]")
      .find("p")
      .should("contain.text", "Краторная булка N-200i");

    cy.get("[class^=modal_modal]")
      .find("p")
      .should("contain.text", "Калории, ккал");
    cy.get("[class^=modal_modal]").find("p").should("contain.text", "420");

    cy.get("[class^=modal_modal]").find("p").should("contain.text", "Белки, г");
    cy.get("[class^=modal_modal]").find("p").should("contain.text", "80");

    cy.get("[class^=modal_modal]").find("p").should("contain.text", "Жиры, г");
    cy.get("[class^=modal_modal]").find("p").should("contain.text", "24");

    cy.get("[class^=modal_modal]")
      .find("p")
      .should("contain.text", "Углеводы, г");
    cy.get("[class^=modal_modal]").find("p").should("contain.text", "53");

    cy.get("[class^=modal_modal]").find("[class^=modal_button]").click();
  });

  it("корректно закрывается", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]")
      .find("li")
      .first()
      .find("li")
      .first()
      .as("bun")
      .click();

    cy.get("[class^=modal_modal]").find("[class^=modal_button]").click();

    cy.get("[class^=modal_modal]").should("not.exist");
  });
});
