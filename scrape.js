const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://learn.microsoft.com/es-mx/users/abrahamdavidsnchezmoncada-2445/transcript', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(5000); // esperamos que cargue el contenido dinámico

  const certs = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll('#certificaciones-activas-table-record-list td:first-child', { timeout: 10000 })];
    return nodes.map(n => n.innerText.trim());
  });

  console.log('Certificaciones extraídas:', certs);

  console.log("Certificaciones encontradas:");
  certs.forEach(c => console.log("- " + c));

  const fs = require('fs');
  fs.writeFileSync('certs_actuales.txt', certs.join('\n'));

  await browser.close();
})();
