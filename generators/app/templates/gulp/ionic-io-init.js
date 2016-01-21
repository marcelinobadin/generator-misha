(function () {
  'use strict';
// gulp
  var gulp = require('gulp');
  var path = require('path');
// plugins
  var $ = require('gulp-load-plugins')();
  var jsonObj = require('../.io-config.json');

  var IONIC_CORE_FILE_PATH = 'app/bower_components/ionic-platform-web-client/dist/';

  var runIonicIoInit = function (command, stream) {
    command = 'io init';
    // create new stream if not provided
    var _stream = stream || gulp.src('');
    _stream
      .pipe($.shell([
        // needs explicit cross-platform path
        path.join('node_modules/ionic/bin/ionic ') + command
      ]));
    return gulp.src(IONIC_CORE_FILE_PATH + '*.js')
      .pipe($.change(performChange))
      .pipe(gulp.dest(IONIC_CORE_FILE_PATH, { overwrite: true }));
  };

  function performChange (content) {

    var SETTINGS_REPLACE_START = '\\\"IONIC_SETTINGS_STRING_START\\\";';
    var SETTINGS_REPLACE_END = '\\\"IONIC_SETTINGS_STRING_END\\\"';
    var SETTINGS_REPLACEMENT = 'return { get: function(setting) { if (settings[setting]) { return settings[setting]; } return null; } };';

    var replacementString = 'var settings = ' + JSON.stringify(jsonObj) + '; ' + SETTINGS_REPLACEMENT;
    return content.replace(new RegExp('(' + SETTINGS_REPLACE_START + ')(.*?)(' + SETTINGS_REPLACE_END + ')', 'g'), '$1' + replacementString + '$3');
  }

  gulp.task('ionic-io-init', runIonicIoInit);

})();
