(function () {
  'use strict';

  var inquirer = require('inquirer');

  module.exports = {
    platforms: [
      {
        value: 'ios',
        name: 'iOS',
        checked: true
      },
      {
        value: 'android',
        name: 'Android',
        checked: true
      }
    ],
    plugins: [
      new inquirer.Separator('-------'),
      {
        value: 'cordova-plugin-device',
        name: 'Device - cordova-plugin-device',
        checked: true
      },
      {
        value: 'cordova-plugin-dialogs',
        name: 'Dialogs - cordova-plugin-dialogs'
      },
      {
        value: 'cordova-plugin-inappbrowser',
        name: 'In App Browser - cordova-plugin-inappbrowser'
      },
      {
        value: 'com.ionic.keyboard',
        name: 'Keyboard - com.ionic.keyboard'
      },
      {
        value: 'cordova-plugin-network-information',
        name: 'Network - cordova-plugin-network-information'
      },
      {
        value: 'cordova-plugin-splashscreen',
        name: 'Splashscreen - cordova-plugin-splashscreen'
      },
      {
        value: 'cordova-plugin-statusbar',
        name: 'Statusbar - cordova-plugin-statusbar'
      },
    ]
  };
})();
