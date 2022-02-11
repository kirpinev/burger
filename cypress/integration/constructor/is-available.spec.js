import { AppRoutes } from "../../../src/enums/app-routes";

describe("Страница конструктора", () => {
  it("доступна по адресу localhost:3000", () => {
    cy.visit(AppRoutes.MainPage)
      .get("h1")
      .should("have.text", "Соберите бургер");
  });
});
