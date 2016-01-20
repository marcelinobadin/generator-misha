(function () {
  'use strict';

  var assert = require('yeoman-assert');
  var sampleAnswers = require('../generators/app/sources/sample-answers.js');

  describe('sample-answers', function () {

    describe('.getStandard(options)', function () {

      it('ios-only: true', function () {
        var answers = sampleAnswers.getStandard({'ios-only': true});
        assert.deepEqual(answers.platforms, ['ios']);
      });

      it('android-only: true', function () {
        var answers = sampleAnswers.getStandard({'android-only': true});
        assert.deepEqual(answers.platforms, ['android']);
      });

      it('cordova: false', function () {
        var answers = sampleAnswers.getStandard({'cordova': false});
        assert.deepEqual(answers.platforms, []);
        assert.deepEqual(answers.plugins, []);
      });

      it('ionicCss: true', function () {
        var answers = sampleAnswers.getStandard({'ionicCss': true});
        assert(answers.ionicCss);
      });

      it('ionicCss: false', function () {
        var answers = sampleAnswers.getStandard({'ionicCss': false});
        assert(!answers.ionicCss);
      });

      it('localforage: false', function () {
        var answers = sampleAnswers.getStandard({'localforage': false});
        var localforage = answers.bowerPackages.filter(function (value) {
          return value.indexOf('localforage') !== -1;
        });
        assert(!localforage.length);
      });

      it('localforage: true (default)', function () {
        var answers = sampleAnswers.getStandard();
        var localforage = answers.bowerPackages.filter(function (value) {
          return value.indexOf('localforage') !== -1;
        });
        assert(localforage.length);
      });

    });
  });
})();
