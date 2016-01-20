(function () {
  'use strict';

  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-test');

  describe('misha:route', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/route'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
        ])
        .withArguments('name')
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'app/base/main/name.controller.js',
        'test/karma/base/main/name.controller.spec.js',
        'app/base/main/name.html'
      ]);
    });
  });
})();
