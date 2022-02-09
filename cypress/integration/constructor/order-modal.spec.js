import { AppRoutes } from "../../../src/enums/app-routes";

describe("Модальное окно заказа", () => {
  before(() => {
    cy.visit(AppRoutes.LoginPage);

    cy.get(".input__icon").first().click();
    cy.get("input").first().click().type("test@test.org");
    cy.get("input").last().click().type("123456");
    cy.get("button").contains("Войти").click();

    cy.wait(2000);
  });

  it("корректно открывается", () => {
    cy.get("[class^=burger-ingredients_ingredientsList]").as("ingredients");

    cy.get("@ingredients")
      .find("li")
      .first()
      .find("li")
      .first()
      .trigger("dragstart");

    cy.get("[class^=empty-constructor_emptyContainer]").trigger("drop");

    cy.get("@ingredients")
      .find("ul")
      .eq(1)
      .find("li")
      .first()
      .trigger("dragstart");

    cy.get("[class^=burger-constructor_burgerConstructor]").trigger("drop");

    cy.get("button").contains("Оформить заказ").click();

    cy.wait(20000);

    cy.get("[class^=modal_modal]")
      .find("p")
      .first()
      .should("have.text", "идентификатор заказа");
  });

  it("корректно закрывается", () => {
    cy.get("[class^=modal_modal]").find("[class^=modal_button]").click();

    cy.get("[class^=modal_modal]").should("not.exist");
  });
});
