import { Page } from "@playwright/test";

export class DashboardPage {
  constructor(private readonly page: Page) {}

  readonly logoutLink = this.page.getByRole("link", { name: "Logout" });

  // Ejemplo de locators combinados mediante variables
  readonly messageCountLink = this.page.locator('[href*="#/admin/messages"]');
  readonly messageCountSpan = this.messageCountLink.locator("span");

  async logout() {
    await this.logoutLink.click();
  }
}
