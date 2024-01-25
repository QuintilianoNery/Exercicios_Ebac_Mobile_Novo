const { loadElements, loadFixtures, loadAssertions } = require("../../functions/loadFunctions.js");
const { checkElementAndVisibleText } = require("../../functions/common.js");

// Global variables
const element = loadElements()
const fixture = loadFixtures()
const assertion = loadAssertions()


beforeEach(async () => {
    await driver.launchApp()
});

afterEach(async () => {
    await driver.closeApp()
});


let url = 'http://lojaebac.ebaconline.art.br/';
let email = 'lojaebacqe@gmail.com';
let password = 'GD*peToHNJ1#c$sgk08EaYJQ';

//deveria verificar os elementos o que acontece antes de preencher os campos, onde estão desabilitados
//Deveria validar elementos importantes da tela
describe('Acessar painel de Administrador', () => {
    it('Validar credenciais', async() => {
        // await HomeScreen.goToLogin();
        // await LoginScreen.setStoreAddress(url)
        await $('id:button_login_store').click();
        await $('id:input').setValue(fixture.login.valid.user);
        await $('id:bottom_button').click();

        await $('id:input').setValue(fixture.login.valid.password);



        // await $('id:login_continue_button').click();
        // await $('id:login_continue_button').waitForExist({ timeout: 5000 });
        // await $('id:input').setValue(password);
        // await $('id:bottom_button').click();

        // await $('id:moreMenu').click();
        // await $('//android.view.View[@content-desc="Configurações"]').click();

        // await $('android.widget.ScrollView').scrollIntoView();
        // await $('btn_option_logout').click();
    });
});