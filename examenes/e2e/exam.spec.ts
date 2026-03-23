import { test, expect } from '@playwright/test';

test.describe('Generador de Exámenes E2E', () => {
  test('Flujo de usuario: Login -> Generar Examen -> Responder -> Dashboard', async ({ page }) => {
    // 1. Ir a la home
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('ExamGen');

    // 2. Login
    await page.click('text=Comenzar Ahora');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Acceder")');

    // 3. Dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h2')).toContainText('Panel de Control');

    // 4. Ir a Examen
    await page.goto('/examen');
    await expect(page.locator('h2')).toContainText('Examen de Prueba');

    // 5. Generar Preguntas (Si no hay, el botón dirá "Generar Banco de Preguntas")
    if (await page.locator('text=Generar Banco de Preguntas').isVisible()) {
      await page.click('text=Generar Banco de Preguntas');
      // Wait for it to disappear and questions to load
      await page.waitForSelector('text=Generar Nuevas Preguntas (API)');
    }

    // 6. Responder algunas preguntas
    const options = page.locator('div[style*="border-radius: 8px"]');
    const count = await options.count();
    if (count > 0) {
      // Pick the first option of the first question
      await options.nth(0).click();
      
      // Submit exam
      page.on('dialog', dialog => dialog.accept()); // Accept the "not all answered" prompt
      await page.click('text=Enviar Examen');

      // Check for score results
      await expect(page.locator('h2')).toContainText('Tu Puntaje');
    }
  });
});
