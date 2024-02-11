const path = require('path')
const { config } = require('../../wdio.shared.confonf')

config.port = 4723

config.specs = [
    '../../../tests/specs/android/**.js',
]

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:platformVersion': '13.0',
    'appium:deviceName': 'samsung-galaxy-s20',
    'appium:automationName': 'UIAutomator2',
    'appium:udid': "RX8N305B2CK",
    'appium:appPackage': "com.woocommerce.android",
    "appium:appActivity": "com.woocommerce.android.ui.main.MainActivity",
    "appium:appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity",
    'appium:app': path.join(process.cwd(), 'apps/android/woocommerce.apk'),
    'appium:autoGrantPermissions': true
}]

config.platform = 'android'
config.application = 'ebac'
config.environment = 'production'

config.services = ['appium']

exports.config = config;