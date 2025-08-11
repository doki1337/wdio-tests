
const path = require('path');
const os   = require('os');

exports.config = {
  runner: 'local',


  specs: ['./test/specs/*.e2e.js', './test/specs/**/*.e2e.js'],

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
      '--start-maximized'
    ]
  }
}],
}
