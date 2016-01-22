(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');

  describe('misha:feature', function () {

    describe('newFeature with default module', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/feature'))
          .withGenerators([ // configure path to subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template')
          ])
          .withArguments('newFeature')
          .on('end', done);
      });

      it('creates files', function () {
        assert.file([
          'app/base/new-feature/new-feature.controller.js',
          'test/karma/base/new-feature/new-feature.controller.spec.js',
          'app/base/new-feature/new-feature.html',
          'app/base/new-feature/assets',
          'app/base/new-feature/styles'
        ]);
      });
    });

    describe('newFeature with myModule.subModule module', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/feature'))
          .withGenerators([ // configure path to subgenerators
            path.join(__dirname, '../generators/controller'),
            path.join(__dirname, '../generators/template')
          ])
          .withArguments(['newFeature', 'myModule.subModule'])
          .on('end', done);
      });

      it('creates files', function () {
        assert.file([
          'app/my-module/sub-module/new-feature/new-feature.controller.js',
          'test/karma/my-module/sub-module/new-feature/new-feature.controller.spec.js',
          'app/my-module/sub-module/new-feature/new-feature.html',
          'app/my-module/sub-module/new-feature/assets',
          'app/my-module/sub-module/new-feature/styles'
        ]);
      });
    });
  });
})();
