const { config } = require('../../../wdio.shared.conf')

// Definitions for test execution
const appUrl = 'bs://aa7081fa45e0042c57cc0aa94eee9d0888bdf086' 
const releaseName = 'Release 1.1.1' // Example: Release 1.1.1 - Hotfix 1
const buildNumber = '00123456'

// Settings of the device to be tested
const deviceName = 'Samsung Galaxy S10e' 
const deviceVersion = '9.0'

config.specs = [
  '../../../../tests/specs/android/**.js',
]

config.services = [
  [
    'browserstack',
    {
      app: process.env.BROWSERSTACK_APP_ID || appUrl,
      buildIdentifier: "${BUILD_NUMBER}",
      browserstackLocal: true,
      testObservability: true,
      testObservabilityOptions: {
        'projectName': 'Automated test APP Escola Ebac',
        'buildName': `Automated test execution in production: ${releaseName}`,
        'buildTag': `Build Number APP: ${buildNumber}`
      },
    },
  ]
]

config.capabilities = [{
  build: process.env.BROWSERSTACK_BUILD_NAME,
  projectName: 'Automated test APP Escola Ebac',
  name: 'UIAutomator2',
  deviceName: deviceName,
  platformVersion: deviceVersion,
  platformName: 'android',
  autoGrantPermissions: true,
  interactiveDebugging: true,
  fullReset: true,
  language: 'pt',
  locale: 'BR'
}]

config.maxInstances = 1

config.platform = 'android'
config.application = 'ebac'
config.environment = 'production'

exports.config = config;