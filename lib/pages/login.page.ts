import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly letMeHack = this.page.getByRole("button", { name: "Let me hack!" });
  readonly username = this.page.getByTestId("username");
  readonly password = this.page.getByTestId("password");
  readonly submit = this.page.getByTestId("submit");

  async goto() {
    this.page.goto("/#/admin", { waitUntil: "networkidle" });
  }

  async loginWith(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
