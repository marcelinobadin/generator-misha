(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');

  var utils = require('../utils/utils.js');

  describe('misha:module', function () {

    var basicFilesTests = function (moduleName, options) {
      var moduleFolder = utils.moduleFolder(moduleName);
      var modulePath = 'app/' + moduleFolder;

      it('basic files and folders', function () {
        assert.file([
          modulePath + '/' + moduleFolder + '.js',
          modulePath + '/main/styles/main.scss'
        ]);

        // module.js
        var moduleFile = modulePath + '/' + moduleFolder + '.js';
        assert.fileContent(moduleFile, 'state: \'' + moduleName + '\'');
        assert.fileContent(moduleFile, 'url: \'/' + moduleFolder + '\'');

        // config
        var configPath = modulePath;
        var configName = '';
        if (options && options.mainModule) {
          configPath += '/config.constant.js';
          configName = utils.configName();
        }
        else {
          configPath += '/' + moduleFolder + '-config.constant.js';
          configName = utils.configName(moduleName);
        }
        assert.fileContent(configPath, '.constant(\'' + configName + '\'');
        assert.fileContent(configPath, 'ENV: {');
      });
    };

    var mainModuleTests = function (moduleName) {
      var moduleFolder = utils.moduleFolder(moduleName);

      it('--mainModule (ionicCss) tests', function () {
        assert.file([
          'app/' + moduleFolder + '/env-dev.json',
          'app/' + moduleFolder + '/env-prod.json'
        ]);
      });
    };

    var ionicCssTests = function (moduleName) {
      var moduleFolder = utils.moduleFolder(moduleName);

      it('ionicCss', function () {
        assert.noFile('app/' + moduleFolder + '/main/styles/' + moduleFolder + '.scss');
      });
    };

    var ionicSassTests = function (moduleName) {
      var moduleFolder = utils.moduleFolder(moduleName);

      it('ionicSass', function () {
        assert.fileContent('app/' + moduleFolder + '/main/styles/main.scss', '$light');
      });
    };

    var noMainModuleTests = function (moduleName) {
      var moduleFolder = utils.moduleFolder(moduleName);
      var modulePath = 'app/' + moduleFolder;

      it('no mainModule tests', function () {
        assert.noFile([
          modulePath + '/env-dev.json',
          modulePath + '/env-prod.json'
        ]);
        assert.noFileContent(modulePath + '/main/styles/main.scss', '$light');
      });
    };

    var tabsTests = function (moduleName, options) {
      var moduleFolder = utils.moduleFolder(moduleName);
      var modulePath = 'app/' + moduleFolder;

      it('tabs tests', function () {
        assert.file([
          modulePath + '/main/assets/images/yo@2x.png'
        ]);

        var moduleFile = modulePath + '/' + moduleFolder + '.js';
        var serviceFile = modulePath + '/main/' + moduleFolder + '.service.js';
        var serviceName = utils.serviceName(moduleName);
        var debugCtrlFile, debugCtrlName;
        var debugSpecFile;
        var configName;

        // mainModule tests
        if (options && options.mainModule) {
          debugCtrlFile = modulePath + '/main/debug.controller.js';
          debugCtrlName = utils.controllerName('Debug');
          debugSpecFile = 'test/protractor/' + moduleFolder + '-debug.spec.js';
          configName = utils.configName();

          // module.js
          assert.fileContent(moduleFile, 'otherwisePath = \'/' + moduleFolder + '/list');
        }
        // no mainModule test
        else {
          debugCtrlFile = modulePath + '/main/' + moduleFolder + '-debug.controller.js';
          debugCtrlName = utils.controllerName(moduleName + 'Debug');
          debugSpecFile = 'test/protractor/' + moduleFolder + '-debug.spec.js';
          configName = utils.configName(moduleName);

          // module.js
          assert.noFileContent(moduleFile, 'otherwisePath = \'/');
        }

        // in any case
        assert.fileContent([
          // module.js
          [moduleFile, 'abstract: true'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/tabs.html'],
          [moduleFile, 'state: \'' + moduleName + '.list'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/list.html'],
          [moduleFile, 'state: \'' + moduleName + '.listDetail'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/list-detail.html'],
          [moduleFile, 'state: \'' + moduleName + '.debug'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/debug.html'],
          [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

          // template files
          [debugCtrlFile, 'controller(\'' + debugCtrlName],
          [debugCtrlFile, serviceName + ', ' + configName],
          [debugCtrlFile, 'this.someData = ' + serviceName],
          [debugCtrlFile, 'this.ENV = ' + configName],
          [debugCtrlFile, 'this.BUILD = ' + configName],
          [serviceFile, 'service(\'' + serviceName],
        ]);

        // templates
        assert.fileContent([
          [modulePath + '/main/debug.html', 'ctrl.someData.binding'],
          [modulePath + '/main/list-detail.html', 'I scaffold apps'],
          [modulePath + '/main/list.html', 'Learn more...'],
          [modulePath + '/main/list.html', moduleName + '.listDetail'],
          [modulePath + '/main/tabs.html', '<ion-tabs'],
          [modulePath + '/main/tabs.html', moduleName + '.list'],
          [modulePath + '/main/tabs.html', moduleName + '.debug'],
        ]);

        // tests
        assert.fileContent([
          [debugSpecFile, 'browser.get(\'/#/' + moduleFolder + '/debug']
        ]);
      });
    };

    describe('main (base, tabs)', function () {
      var options = {
        mainModule: true,
        ionicCss: true
      };

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to  subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withArguments('base')
          .withPrompts({ template: 'tabs' })
          .withOptions(options)
          .on('end', done);
      });

      basicFilesTests('base', options);
      mainModuleTests('base');
      ionicCssTests('base');
      tabsTests('base', options);
    });

    describe('ionicSass tests', function () {
      var options = {
        mainModule: true,
      };

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to  subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withArguments('base')
          .withPrompts({ template: 'tabs'})
          .withOptions(options)
          .on('end', done);
      });

      ionicSassTests('base');
    });

    describe('myModule (no main, tabs)', function () {

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to  subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withArguments('myModule')
          .withPrompts({ template: 'tabs' })
          .on('end', done);
      });

      basicFilesTests('myModule');
      noMainModuleTests('myModule');
      tabsTests('myModule');
    });

    var sideMenuTests = function (moduleName, options) {
      var moduleFolder = utils.moduleFolder(moduleName);
      var modulePath = 'app/' + moduleFolder;

      it('sideMenu tests', function () {
        assert.file([
          modulePath + '/main/assets/images/yo@2x.png',
        ]);

        var moduleFile = modulePath + '/' + moduleFolder + '.js';
        var serviceFile = modulePath + '/main/' + moduleFolder + '.service.js';
        var serviceName = utils.serviceName(moduleName);
        var debugCtrlFile, debugCtrlName;
        var menuCtrlFile, menuCtrlName;
        var configName;

        // mainModule tests
        if (options && options.mainModule) {
          menuCtrlFile = modulePath + '/main/menu.controller.js';
          menuCtrlName = utils.controllerName('Menu');
          debugCtrlFile = modulePath + '/main/debug.controller.js';
          debugCtrlName = utils.controllerName('Debug');
          configName = utils.configName();

          // module.js
          assert.fileContent(moduleFile, 'otherwisePath = \'/' + moduleFolder + '/list');
        }
        // no mainModule test
        else {
          menuCtrlFile = modulePath + '/main/' + moduleFolder + '-menu.controller.js';
          menuCtrlName = utils.controllerName(moduleName + 'Menu');
          debugCtrlFile = modulePath + '/main/' + moduleFolder + '-debug.controller.js';
          debugCtrlName = utils.controllerName(moduleName + 'Debug');
          configName = utils.configName(moduleName);

          // module.js
          assert.noFileContent(moduleFile, 'otherwisePath = \'/');
        }

        // in any case
        assert.fileContent([
          // module.js
          [moduleFile, 'abstract: true'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/menu.html'],
          [moduleFile, 'controller: \'' + menuCtrlName + ' as menu\''],
          [moduleFile, 'state: \'' + moduleName + '.list'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/list.html'],
          [moduleFile, 'state: \'' + moduleName + '.listDetail'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/list-detail.html'],
          [moduleFile, 'state: \'' + moduleName + '.debug'],
          [moduleFile, 'templateUrl: \'' + moduleFolder + '/main/debug.html'],
          [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

          // template files
          [debugCtrlFile, 'controller(\'' + debugCtrlName],
          [debugCtrlFile, serviceName + ', ' + configName],
          [debugCtrlFile, 'this.someData = ' + serviceName],
          [debugCtrlFile, 'this.ENV = ' + configName],
          [debugCtrlFile, 'this.BUILD = ' + configName],
          [serviceFile, 'service(\'' + serviceName],
          [menuCtrlFile, 'controller(\'' + menuCtrlName],
        ]);

        // templates
        assert.fileContent([
          [modulePath + '/main/debug.html', 'ctrl.someData.binding'],
          [modulePath + '/main/list-detail.html', 'I scaffold apps'],
          [modulePath + '/main/list.html', 'Learn more...'],
          [modulePath + '/main/list.html', moduleName + '.listDetail'],
          [modulePath + '/main/menu.html', '<ion-side-menu'],
          [modulePath + '/main/menu.html', moduleName + '.list'],
          [modulePath + '/main/menu.html', moduleName + '.debug']
        ]);

      });
    };

    describe('main (main, sidemenu)', function () {
      var options = {
        mainModule: true
      };

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to  subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withArguments('base')
          .withPrompts({ template: 'sidemenu' })
          .withOptions(options)
          .on('end', done);
      });

      basicFilesTests('base', options);
      mainModuleTests('base');
      sideMenuTests('base', options);
    });

    describe('myModule (no main, sidemenu)', function () {

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to  subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withArguments('myModule')
          .withPrompts({ template: 'sidemenu' })
          .on('end', done);
      });

      basicFilesTests('myModule');
      noMainModuleTests('myModule');
      sideMenuTests('myModule');
    });

    var blankTests = function (moduleName) {
      var moduleFolder = utils.moduleFolder(moduleName);
      var modulePath = 'app/' + moduleFolder;

      it('blank tests', function () {
        assert.noFile([
          modulePath + '/main/assets/images/yo@2x.png',
        ]);

        // module.js
        var moduleFile = modulePath + '/' + moduleFolder + '.js';
        assert.fileContent(moduleFile, 'view-title="' + moduleName + '">');
        assert.fileContent(moduleFile, moduleFolder + '/main');
      });
    };

    describe('main (main, blank)', function () {
      var options = {
        mainModule: true
      };

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withPrompts({ template: 'blank' })
          .withOptions(options)
          .withArguments('base')
          .on('end', done);
      });

      basicFilesTests('base', options);
      mainModuleTests('base');
      blankTests('base', options);
    });

    describe('myModule (no main, blank)', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/module'))
          .withGenerators([ // configure path to subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template'),
            path.join(__dirname, '../generators/service'),
            path.join(__dirname, '../generators/constant')
          ])
          .withPrompts({ template: 'blank' })
          .withArguments('myModule')
          .on('end', done);
      });

      basicFilesTests('myModule');
      noMainModuleTests('myModule');
      blankTests('myModule');
    });

  });
})();
