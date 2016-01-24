(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');
  var config = require(path.join(__dirname, '../utils/config.js'));

  describe('misha:controller', function () {

    describe('some', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/controller'))
          .withArguments('some')
          .on('end', done);
      });

      it('file, module name, controller signature', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/main/some.controller.js';
        assert.fileContent([
          [filePath, '.module(\'' + config.DEFAULT_MODULE + '\')'],
          [filePath, 'controller(\'Some' + config.CONTROLLER_SUFFIX + '\', Some' + config.CONTROLLER_SUFFIX + ')'],
          [filePath, 'function Some' + config.CONTROLLER_SUFFIX + ' (logger) {']
        ]);
      });

      it('spec file, default signature, default content', function () {
        var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/main/some.controller.spec.js';
        assert.fileContent([
          [filePath, 'describe(\'module: base, controller: Some' + config.CONTROLLER_SUFFIX + ''],
          [filePath, 'it(\'should do something\', function () {']
        ]);
      });
    });

    describe('some' + config.CONTROLLER_SUFFIX + ' myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/controller'))
          .withArguments('some' + config.CONTROLLER_SUFFIX + ' myModule')
          .on('end', done);
      });

      it('file, module name', function () {
        var filePath = 'app/my-module/main/some.controller.js';
        assert.fileContent([
          [filePath, '.module(\'myModule\')']
        ]);
      });

      it('spec file, default signature', function () {
        var filePath = 'test/karma/my-module/main/some.controller.spec.js';
        assert.fileContent([
          [filePath, 'describe(\'module: myModule, controller: Some' + config.CONTROLLER_SUFFIX + '']
        ]);
      });
    });

    describe('some' + config.CONTROLLER_SUFFIX + ' --template=debug', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/controller'))
          .withArguments('some' + config.CONTROLLER_SUFFIX + ' ')
          .withOptions({ template: 'debug' })
          .on('end', done);
      });

      it('file, controller signature, debug logic & placeholders', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/main/some.controller.js';
        assert.fileContent([
          [filePath, 'logger, Base, Config, $cordovaDevice) {'],
          [filePath, 'this.someData = Base.'],
          [filePath, 'this.ENV = Config.ENV'],
          [filePath, 'this.BUILD = Config.BUILD']
        ]);
      });

      it('spec file, debug content', function () {
        var filePath = 'test/karma/' + config.DEFAULT_MODULE + '/main/some.controller.spec.js';
        assert.fileContent([
          [filePath, 'describe(\'.grade()']
        ]);
      });
    });

    describe('some' + config.CONTROLLER_SUFFIX + ' myModule --template=debug', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/controller'))
          .withArguments('some' + config.CONTROLLER_SUFFIX + ' myModule')
          .withOptions({ template: 'debug' })
          .on('end', done);
      });

      it('file, controller signature, debug logic & placeholders', function () {
        var filePath = 'app/my-module/main/some.controller.js';
        assert.fileContent([
          [filePath, 'logger, MyModule, MyModuleConfig'],
          [filePath, 'this.someData = MyModule.'],
          [filePath, 'this.ENV = MyModuleConfig.ENV'],
          [filePath, 'this.BUILD = MyModuleConfig.BUILD'],
          [filePath, 'this.grade = ']
        ]);
      });

      it('spec file, debug content', function () {
        var filePath = 'test/karma/my-module/main/some.controller.spec.js';
        assert.fileContent([
          [filePath, 'describe(\'.grade()']
        ]);
      });
    });
  });
})();
