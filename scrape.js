const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://learn.microsoft.com/es-mx/users/abrahamdavidsnchezmoncada-2445/', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(5000); // esperamos que cargue el contenido dinámico

  const certs = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll('.achievement-card .title')];
    return nodes.map(n => n.innerText.trim());
  });

  console.log("Certificaciones encontradas:");
  certs.forEach(c => console.log("- " + c));

  const fs = require('fs');
  fs.writeFileSync('certs_actuales.txt', certs.join('\n'));

  await browser.close();
})();
