(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');
  var config = require(path.join(__dirname, '../utils/config.js'));

  describe('misha:constant', function () {
    describe('misha:constant some', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/constant'))
          .withArguments('some')
          .on('end', done);
      });

      it('constant file contents', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/some.constant.js';
        assert.fileContent([
          [filePath, '.module(\'' + config.DEFAULT_MODULE + '\')'],
          [filePath, 'constant(\'some\','],
          [filePath, 'CONSTANT_1: \'meaningful value\'']
        ]);
      });
    });

    describe('misha:constant someThing myModule', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/constant'))
          .withArguments('someThing myModule')
          .on('end', done);
      });

      it('constant file contents', function () {
        var filePath = 'app/my-module/some-thing.constant.js';
        assert.fileContent([
          [filePath, '.module(\'myModule\')'],
          [filePath, 'constant(\'someThing\','],
          [filePath, 'CONSTANT_1: \'meaningful value\'']
        ]);
      });
    });

    describe('misha:constant myConstant --template=config', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/constant'))
          .withArguments('myConstant')
          .withOptions({ template: 'config' })
          .on('end', done);
      });

      it('constant file contents', function () {
        var filePath = 'app/' + config.DEFAULT_MODULE + '/my-constant.constant.js';
        assert.fileContent(filePath, 'ENV: {');
      });
    });
  });
})();
