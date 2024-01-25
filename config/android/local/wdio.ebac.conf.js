const path = require('path')
const { config } = require('../../wdio.shared.confonf')

config.port = 4723

config.specs = [
    '../../../tests/specs/android/**.js',
]

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:platformVersion': '9.0',
    'appium:deviceName': 'Samsung Galaxy S10e',
    'appium:automationName': 'UIAutomator2',
    'appium:app': path.join(process.cwd(), 'apps/android/woocommerce.apk'),
    'appium:autoGrantPermissions': true
}]

config.platform = 'android'
config.application = 'EBAC'
config.environment = 'staging'

config.services = ['appium']

exports.config = config;