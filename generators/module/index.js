(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var mkdirp = require('mkdirp');

  var utils = require('../../utils/utils.js');
  var config = require('../../utils/config.js');
  var sampleAnswers = require('../app/sources/sample-answers.js');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      this.log('You called the misha:module subgenerator.');

      // arguments
      this.argument('name', {
        required: true,
        type: String,
        desc: 'The subgenerator name'
      });

      this.moduleName = utils.moduleName(this.name);
      if (this.moduleName.lastIndexOf('.') !== -1) {
        this.subModuleName = this.moduleName.substr(this.moduleName.lastIndexOf('.') + 1);
        this.parentModuleName = this.moduleName.substr(0, this.moduleName.lastIndexOf(this.subModuleName) - 1);
      } else {
        this.subModuleName = this.moduleName;
      }
      this.controllerName = utils.controllerName(this.name);
      this.fileName = utils.fileName(this.name);
      this.moduleFolder = utils.moduleFolder(this.moduleName);
      this.subModuleFolder = utils.moduleFolder(this.subModuleName);
    },

    prompting: function () {
      // prompt and save results in this.answers

      if (!this.options['skip-prompts']) {
        // tell yeoman we're doing asynchronous stuff here
        // so it can wait with subsequent tasks
        var done = this.async();

        this.prompt({
          type: 'list',
          name: 'template',
          message: 'Choose a starter template',
          choices: [
            {
              value: 'sidemenu',
              name: 'sidemenu'
            },
            {
              value: 'tabs',
              name: 'tabs'
            },
            {
              value: 'blank',
              name: 'blank'
            }
          ]
        },
          function (answers) { // prompt
            this.answers = answers;

            done();
          }.bind(this));
      }
      else {
        this.answers = sampleAnswers.getStandard();
      }
    },

    writing: function () {

      // basic files
      var modulePath = 'app/' + this.moduleFolder;
      var moduleDefaultFeaturePath = modulePath + '/' + config.DEFAULT_FEATURE;
      mkdirp.sync(modulePath);

      // basic templated files
      if (this.options.mainModule) {
        this.menuCtrlName = utils.controllerName('Menu');
        this.debugCtrlName = utils.controllerName('Debug');
      }
      else {
        this.menuCtrlName = utils.controllerName(this.subModuleName + 'Menu');
        this.debugCtrlName = utils.controllerName(this.subModuleName + 'Debug');
      }
      this.template('_module.js', modulePath + '/' + this.subModuleFolder + '.js');
      this.template('_module.scss', moduleDefaultFeaturePath + '/styles/' + config.DEFAULT_FEATURE + '.scss');
      // create config constant
      this.composeWith('misha:constant', {
        arguments: utils.configName(this.subModuleName) + ' ' + this.moduleName,
        options: {
          template: 'config'
        }
      });

      // main module files
      if (this.options.mainModule) {
        this.copy('env-dev.json', modulePath + '/env-dev.json');
        this.copy('env-prod.json', modulePath + '/env-prod.json');
      }

      // both (sidemenu & tabs)
      if (this.answers.template !== 'blank') {
        // yo@2x.png
        this.copy('yo.png', moduleDefaultFeaturePath + '/assets/images/yo@2x.png');
        // spec file
        this.template('_module-debug.spec.js', 'test/protractor/' + this.moduleFolder + '-debug.spec.js');

        // debug
        this.composeWith('misha:controller', {
          arguments: this.debugCtrlName + ' ' + this.moduleName,
          options: { template: 'debug' }
        });
        this.composeWith('misha:template', {
          arguments: 'debug ' + this.moduleName,
          options: { template: 'debug' }
        });
        this.composeWith('misha:service', {
          arguments: this.subModuleName + ' ' + this.moduleName,
          options: {  template: 'debug' }
        });

        // other templates
        this.composeWith('misha:template', {
          arguments: 'list ' + this.moduleName,
          options: { template: 'list' }
        });
        this.composeWith('misha:template', {
          arguments: 'list-detail ' + this.moduleName,
          options: { template: 'list-detail' }
        });
      }
      // sidemenu
      if (this.answers.template === 'sidemenu') {
        // menu
        this.composeWith('misha:controller', {
          arguments: this.menuCtrlName + ' ' + this.moduleName,
        });
        this.composeWith('misha:template', {
          arguments: 'menu ' + this.moduleName,
          options: { template: 'menu' }
        });
      }
      // tabs
      if (this.answers.template === 'tabs') {
        // tabs
        this.composeWith('misha:template', {
          arguments: 'tabs ' + this.moduleName,
          options: { template: 'tabs' }
        });
      }
      // blank
      if (this.answers.template === 'blank' || !this.options.mainModule) {
        this.composeWith('misha:feature', {
          arguments: config.DEFAULT_FEATURE + ' ' + this.moduleName
        });
      }

      // Adds the created module into main module file (app.js)
      var appPath = 'app/app.js';
      if (this.fs.exists(appPath)) {
        var fileStr = this.fs.read(appPath);
        fileStr = fileStr.replace(/\/\/\#new\-module/g, '\'' + this.moduleName + '\',\n      \/\/#new-module');
        this.fs.write(appPath, fileStr);
      }
    }
  });
})();
