exports.checkElementAndVisibleText = async (element, text) => {
    await $(element).isDisplayed()
    await expect($(element)).toHaveText(text)
};