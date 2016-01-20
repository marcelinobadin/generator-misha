(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');
  var config = require(path.join(__dirname, '../utils/config.js'));

  describe('misha:directive', function () {
    describe('some', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/directive'))
          .withArguments('some')
          .on('end', done);
      });

      it('file, content', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/main/some.directive.js';
        assert.fileContent([
          [filePath, '.module(\'' + config.DEFAULT_MODULE + '\')'],
          [filePath, 'directive(\'some\','],
          [filePath, 'this is the some directive']
        ]);
      });

      it('spec file, describe signature, critical content', function () {
        var specPath = 'test/karma/' + config.DEFAULT_MODULE + '/main/some.directive.spec.js';
        assert.fileContent([
          [specPath, 'module: base, directive: some'],
          [specPath, '<some></some>'],
          [specPath, 'this is the some directive']
        ]);
      });
    });

    describe('someThing myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/directive'))
          .withArguments('someThing myModule')
          .on('end', done);
      });

      it('file, content', function () {
        var filePath = 'app/my-module/main/some-thing.directive.js';
        assert.fileContent([
          [filePath, '.module(\'myModule\')'],
          [filePath, 'directive(\'someThing\','],
          [filePath, 'this is the someThing directive']
        ]);
      });

      it('spec file, describe signature, critical content', function () {
        var specPath = 'test/karma/my-module/main/some-thing.directive.spec.js';
        assert.fileContent([
          [specPath, 'module: myModule, directive: someThing'],
          [specPath, '<some-thing></some-thing>'],
          [specPath, 'this is the someThing directive']
        ]);
      });
    });
  });
})();
