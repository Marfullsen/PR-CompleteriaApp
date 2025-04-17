const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  // Configura el navegador
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navega a la URL de tu aplicación
    await driver.get('http://localhost:8100'); // Asegúrate de que la URL sea correcta

    // Espera a que la página se cargue completamente
    await driver.wait(until.elementLocated(By.css('.login-container')), 10000);
    console.log('a');
    

    // Encuentra los elementos de entrada y el botón de inicio de sesión
    let emailInput = await driver.findElement(By.css('input[type="email"]'));
    let passwordInput = await driver.findElement(By.css('input[type="password"]'));
    let loginButton = await driver.findElement(By.css('.login-button'));
    console.log('b');

    // Introduce las credenciales
    await emailInput.sendKeys('cacot12@gmail.com');
    await passwordInput.sendKeys('cacomarvi');
    console.log('c');

    // Haz scroll al botón de inicio de sesión si es necesario
    await driver.executeScript("arguments[0].scrollIntoView(true);", loginButton);
    
    // Haz clic en el botón de inicio de sesión
    await loginButton.click();
    console.log('d');

    // Espera un tiempo para que el mensaje de error aparezca en la consola
    await driver.sleep(2000);
    console.log('f');

    // Captura los mensajes de la consola
    let logs = await driver.manage().logs().get('browser');
    let errorMessage = logs.find(log => log.message.includes('Error al iniciar sesión: Firebase: Error (auth/invalid-credential)'));

    if (errorMessage) {
      console.log('Error de inicio de sesión detectado:', errorMessage.message);
    } else {
      console.log('Inicio de sesión exitoso');
    }
  } finally {
    // Cierra el navegador
    await driver.quit();
  }
}

testLogin();
