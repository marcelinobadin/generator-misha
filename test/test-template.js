(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');
  var config = require(path.join(__dirname, '../utils/config.js'));

  describe('misha:template', function () {

    describe('some-template', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('some-template')
          .on('end', done);
      });

      it('file path, default content, module title', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/main/some-template.html';
        assert.fileContent([
          [filePath, 'This is your some-template template!'],
          [filePath, '<ion-view view-title="' + config.DEFAULT_MODULE + ' module">']
        ]);
      });
    });

    describe('someTemplate myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('someTemplate myModule')
          .on('end', done);
      });

      it('file path, default content, module title', function () {
        var filePath = 'app/my-module/main/some-template.html';
        assert.fileContent([
          [filePath, 'This is your someTemplate template!'],
          [filePath, '<ion-view view-title="myModule module">'],
        ]);
      });
    });

    describe('debug', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('debug')
          .withOptions({ template: 'debug' })
          .on('end', done);
      });

      it('file path, debug content, module title', function () {
        var filePath = 'app/base/main/debug.html';
        assert.fileContent([
          [filePath, 'Password Test:'],
          [filePath, '<ion-view view-title="base debug">'],
        ]);
      });
    });

    describe('list-detail', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('list-detail')
          .withOptions({ template: 'list-detail' })
          .on('end', done);
      });

      it('file path, list-detail content', function () {
        var filePath = 'app/base/main/list-detail.html';
        assert.fileContent([
          [filePath, '<ion-view view-title="Mr. Yo">'],
        ]);
      });
    });

    describe('list', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('list')
          .withOptions({ template: 'list' })
          .on('end', done);
      });

      it('file path, list content, link to list detail', function () {
        var filePath = 'app/base/main/list.html';
        assert.fileContent([
          [filePath, '<ion-view view-title="List">'],
          [filePath, 'ui-sref="base.listDetail"']
        ]);
      });
    });

    describe('list myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('list myModule')
          .withOptions({ template: 'list' })
          .on('end', done);
      });

      it('file path, list content, link to list detail', function () {
        var filePath = 'app/my-module/main/list.html';
        assert.fileContent([
          [filePath, '<ion-view view-title="List">'],
          [filePath, 'ui-sref="myModule.listDetail"']
        ]);
      });
    });

    describe('menu', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('menu')
          .withOptions({ template: 'menu' })
          .on('end', done);
      });

      it('file path, menu content, link to list & debug', function () {
        var filePath = 'app/base/main/menu.html';
        assert.fileContent([
          [filePath, '<ion-side-menu-content>'],
          [filePath, 'ui-sref="base.list"'],
          [filePath, 'ui-sref="base.debug"'],
        ]);
      });
    });

    describe('menu myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('menu myModule')
          .withOptions({ template: 'menu' })
          .on('end', done);
      });

      it('file path, menu content, link to list & debug', function () {
        var filePath = 'app/my-module/main/menu.html';
        assert.fileContent([
          [filePath, '<ion-side-menu-content>'],
          [filePath, 'ui-sref="myModule.list"'],
          [filePath, 'ui-sref="myModule.debug"'],
        ]);
      });
    });

    describe('tabs', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('tabs')
          .withOptions({ template: 'tabs' })
          .on('end', done);
      });

      it('file path, tabs content, module name', function () {
        var filePath = 'app/base/main/tabs.html';
        assert.fileContent([
          [filePath, '<ion-tabs'],
          [filePath, 'ui-sref="base.list"'],
          [filePath, 'ui-sref="base.debug"'],
        ]);
      });
    });

    describe('tabs myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/template'))
          .withArguments('tabs myModule')
          .withOptions({ template: 'tabs' })
          .on('end', done);
      });

      it('file path, tabs content, module name', function () {
        var filePath = 'app/my-module/main/tabs.html';
        assert.fileContent([
          [filePath, '<ion-tabs'],
          [filePath, 'ui-sref="myModule.list"'],
          [filePath, 'ui-sref="myModule.debug"']
        ]);
      });
    });
  });
})();
