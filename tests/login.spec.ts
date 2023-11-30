import { test, expect } from '@playwright/test';
import { LoginPage } from "../lib/pages/login.page";
import { DashboardPage } from "../lib/pages/dashboard.page";

test('Login as Admin - Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.goto();
  await loginPage.letMeHack.click();
  await loginPage.loginWith("admin", "password");
  await expect(dashboardPage.logoutLink).toContainText("Logout");
  await dashboardPage.logoutLink.click();
  await page.waitForLoadState("networkidle");
  await expect(dashboardPage.logoutLink).not.toBeVisible();
  await expect(loginPage.submit).toBeVisible();
});

test('Validar cantidad de mensajes', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.goto();
  await loginPage.letMeHack.click();
  await loginPage.loginWith("admin", "password");

  // Interceptamos la petición al backend para obtener el recuento de mensajes
  let message;
  await page.route("**/message/count", async (route) => {
    const response = await route.fetch();
    message = await response.json();
    route.continue();
  });

  /*
  Esperar a que se actualice el recuento de mensajes
  antes de hacer una assertion
  */
  await page.waitForLoadState("networkidle");
  await expect(dashboardPage.messageCountSpan).toHaveText(`${message.count}`);

  await expect(dashboardPage.logoutLink).toContainText("Logout");
  await dashboardPage.logoutLink.click();
  await page.waitForLoadState("networkidle");
});