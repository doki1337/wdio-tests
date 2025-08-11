export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  baseUrl: 'https://www.saucedemo.com',
  capabilities: [{
    browserName: 'chrome',
    maxInstances: 1,
    'goog:chromeOptions': {
      args: [
        '--disable-search-engine-choice-screen',
        '--disable-popup-blocking',
        '--disable-notifications',
        '--disable-save-password-bubble',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-infobars',
        '--start-maximized',
        '--disable-extensions',
        '--user-data-dir=C:/temp/chrome-profile-test123'
      ],
      prefs: {
        'credentials_enable_service': false,
        'profile.password_manager_enabled': false
      }
    }
  }],
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
}