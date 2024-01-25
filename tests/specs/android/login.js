const { loadElements, loadFixtures, loadAssertions } = require("../../functions/loadFunctions.js");
const { checkElementAndVisibleText } = require("../../functions/common.js");

// Global variables
const element = loadElements()
const fixture = loadFixtures()
const assertion = loadAssertions()

// Mapping of the data to be used
const data = [
    { loginCode: fixture.login.valid.userSemente.consultantCode, password: fixture.login.valid.userSemente.password, level: 'Semente' },
    { loginCode: fixture.login.valid.userBronze.consultantCode, password: fixture.login.valid.userBronze.password, level: 'Bronze' },
    { loginCode: fixture.login.valid.userPrata.consultantCode, password: fixture.login.valid.userPrata.password, level: 'Prata' },
    { loginCode: fixture.login.valid.userOuro.consultantCode, password: fixture.login.valid.userOuro.password, level: 'Ouro' },
    { loginCode: fixture.login.valid.userDiamante.consultantCode, password: fixture.login.valid.userDiamante.password, level: 'Diamante' },
]

beforeEach(async () => {
    await driver.launchApp()
});

afterEach(async () => {
    await driver.closeApp()
});

describe('Login', () => {
    context('Realizar login com usuário CN', () => {
        beforeEach(async () => {
            // Go to the login page
            //Confirms that the presentation screen is displayed successfully and skips it
            await $(element.btnSkip).waitForDisplayed({ timeout: 30000 })
            await expect($(element.btnSkip)).toHaveText(assertion.login.onboarding.btnSkip)
            await $(element.btnSkip).click()

            //Confirm to grant access to the cell phone number
            await $(element.baseTitleAccessPermission).waitForDisplayed({ timeout: 30000 })
            await expect($(element.baseTitleAccessPermission)).toHaveText(assertion.login.accessPermission.titlePhoneNumber)
            await $(element.btnAgree).click()
        })

        data.forEach(data => {
            it(`Realizar login com nível ${data.level}`, async () => {
                //Filling in the user details and click on the Login button
                await $(element.btnLoginEnter).getAttribute('enabled', false)
                await $(element.baseLoginCode).$(element.inputCode).addValue(data.loginCode)
                await $(element.baseLoginPassword).addValue(data.password)
                await $(element.btnLoginEnter).getAttribute('enabled', true)
                await $(element.btnLoginEnter).click()

                //Confirms that the consultant is logged in and the level is displayed in the menu
                await $(element.baseHomeToolbar).waitForDisplayed({ timeout: 30000 })
                await $(element.btnHomeMenu).click()
                await $(element.baseMenuConsultant).isDisplayed()
                await $(element.baseConsultantLevel).isDisplayed()
                const consultantLevel = `${assertion.menu.consultantLevel}${data.level}`
                await expect($(element.baseConsultantLevel).$(element.baseViewConsultantLevel).$(element.baseTextViewConsultantLevel)).toHaveText(consultantLevel)

                //Click on the consultant's profile and check their user level
                await $(element.baseConsultantContainer).isDisplayed()
                await $(element.baseConsultantContainer).click()
                await $(element.baseStatusBar).isDisplayed()
                await expect($(element.baseCurrentLevel)).toHaveText(assertion.profile.consultantLevel)
                await expect($(element.baseCurrentLevelColor)).toHaveText(data.level)
            });
        });
        it.only('Exibir menu para o usuário CN', async () => {
            let loginCode = data[0].loginCode
            let loginPassword = data[0].password

            //Filling in the user details and click on the Login button
            await $(element.baseLoginCode).$(element.inputCode).addValue(loginCode)
            await $(element.baseLoginPassword).addValue(loginPassword, { log: false })
            await $(element.btnLoginEnter).click()
            await $(element.btnHomeMenu).waitForDisplayed({ timeout: 30000 })

            //Confirms that the APP menu is being displayed
            await $(element.btnHomeMenu).click()
            await $(element.baseMenuConsultant).isDisplayed()
            await $(element.baseMenuList).isDisplayed()
            await $(element.baseMenuList).waitForDisplayed({ timeout: 30000 })

            //Confirm total menu list items
            // ##### Paulo Jorge, ajuste nesta linha aqui #####
            await expect($(element.baseListItems).length).toBe(8);


            //Confirm that the Help item menu group is visible
            await checkElementAndVisibleText(await $(element.baseHelpItem), assertion.menu.items.helpItem)
            await $(element.baseHelpItem).click()

            await checkElementAndVisibleText(await $(element.baseDigitalService), assertion.menu.items.subItems.digitalService)
            await checkElementAndVisibleText(await $(element.baseContactUs), assertion.menu.items.subItems.contactUs)
            await checkElementAndVisibleText(await $(element.baseMyLeader), assertion.menu.items.subItems.myLeader)

            //Confirm that the Disclosure menu group is visible
            await checkElementAndVisibleText(await $(element.baseDisclosure), assertion.menu.items.disclosure)
            await $(element.baseDisclosure).click()
            await checkElementAndVisibleText(await $(element.baseMyDisclosure), assertion.menu.items.subItems.myDisclosure)
            await checkElementAndVisibleText(await $(element.baseMagazines), assertion.menu.items.subItems.magazines)

            // Confirm that the Orders and Products menu group is visible
            await checkElementAndVisibleText(await $(element.baseOrdersAndProducts), assertion.menu.items.ordersAndProducts)
            await $(element.baseOrdersAndProducts).click()
            await checkElementAndVisibleText(await $(element.baseNewRequest), assertion.menu.items.subItems.newRequest)
            await checkElementAndVisibleText(await $(element.basePromotions), assertion.menu.items.subItems.promotions)
            await checkElementAndVisibleText(await $(element.baseOrderHistory), assertion.menu.items.subItems.orderHistory)

            // Confirm that the My Digital Services menu group is visible
            await checkElementAndVisibleText(await $(element.baseMyDigitalServices), assertion.menu.items.myDigitalServices)
            await $(element.baseMyDigitalServices).click()
            await checkElementAndVisibleText(await $(element.baseOffersForCustomers), assertion.menu.items.subItems.offersForCustomers)

            //Confirm that the My Financial menu group is visible
            await checkElementAndVisibleText(await $(element.baseMyFinancial), assertion.menu.items.myFinancial)
            await $(element.baseMyFinancial).click()
            await checkElementAndVisibleText(await $(element.baseEmanaPay), assertion.menu.items.subItems.emanaPay)
            await checkElementAndVisibleText(await $(element.baseBills), assertion.menu.items.subItems.bills)

            //Confirm that the Management menu group is visible
            await checkElementAndVisibleText(await $(element.baseManagementAndPlanning), assertion.menu.items.managementAndPlanning)
            await $(element.baseManagementAndPlanning).click()
            await checkElementAndVisibleText(await $(element.baseMyEvents), assertion.menu.items.subItems.myEvents)
            await checkElementAndVisibleText(await $(element.baseMyClients), assertion.menu.items.subItems.myClients)
            await checkElementAndVisibleText(await $(element.baseMySales), assertion.menu.items.subItems.mySales)
            await checkElementAndVisibleText(await $(element.baseApplications), assertion.menu.items.subItems.applications)
            await checkElementAndVisibleText(await $(element.baseGrowthPlan), assertion.menu.items.subItems.growthPlan)

            //Confirm that the Trainings and Courses menu group is visible
            await checkElementAndVisibleText(await $(element.baseTrainingsAndCourses), assertion.menu.items.trainingsAndCourses)
            await $(element.baseTrainingsAndCourses).click()
            await checkElementAndVisibleText(await $(element.baseTrainings), assertion.menu.items.subItems.trainings)
            await checkElementAndVisibleText(await $(element.baseLiveTrainings), assertion.menu.items.subItems.liveTrainings)

            //Confirm that the Social Benefits menu group is visible
            await checkElementAndVisibleText(await $(element.baseSocialBenefits), assertion.menu.items.socialBenefits)
            await $(element.baseSocialBenefits).click()
            await checkElementAndVisibleText(await $(element.baseBenefits), assertion.menu.items.subItems.benefits)

            //Confirm that the Sign Out option is visible
            await checkElementAndVisibleText(await $(element.BaseSignOut), assertion.menu.items.signOut)
        });
    });
});