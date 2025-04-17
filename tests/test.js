const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Abre la aplicación Ionic
        await driver.get('http://localhost:8100'); // Asegúrate de que tu app esté corriendo

        // Espera a que un elemento esté presente y realiza acciones
        await driver.wait(until.elementLocated(By.css('image-container')), 10000);
        let element = await driver.findElement(By.css('image-container'));
        await element.click(); // Ejemplo de clic en un elemento

        // Más interacciones...
    } finally {
        await driver.quit();
	console.log("Todo biennnnn");
    }
})();
