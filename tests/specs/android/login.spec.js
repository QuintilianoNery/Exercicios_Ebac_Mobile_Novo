const { loadElements, loadFixtures, loadAssertions } = require("../../functions/loadFunctions.js");
const { checkElementAndVisibleText } = require("../../functions/common.js");
const { expect } = require('@wdio/globals');


// Global variables
const element = loadElements()
const fixture = loadFixtures()
const assertion = loadAssertions()


//deveria verificar os elementos o que acontece antes de preencher os campos, onde estão desabilitados
//Deveria validar elementos importantes da tela
describe('Login', () => {
    it('Realizar login no painel de administrador', async () => {
        //click button home
        await $(element.home.btnLoginStore).isDisplayed({ timeout: 30000 })
        await expect($(element.home.btnLoginStore)).toHaveText(assertion.home.btnLoginStore)
        await $(element.home.btnLoginStore).click()

        //Set value Website  
        await $(element.login.inputWebsiteAddress).setValue(fixture.websiteAddress)
        await $(element.login.btnContinue).click()

    });
});