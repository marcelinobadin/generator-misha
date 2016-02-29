(function () {
  'use strict';
// gulp
  var gulp = require('gulp');
  var path = require('path');
  var options = gulp.options;
// plugins
  var $ = require('gulp-load-plugins')();

  var IONIC_CORE_FILE_PATH = 'app/bower_components/ionic-platform-web-client/dist/';

  var changeIonicFiles = function () {
    return gulp.src(IONIC_CORE_FILE_PATH + '*.js')
      .pipe($.change(performChange))
      .pipe(gulp.dest(IONIC_CORE_FILE_PATH, { overwrite: true }));
  };

  var runIonicScript = function (command, stream) {
    // allow to overwrite command from option.cordova with parameter
    command = typeof command === 'string' ? command : options.ionic;
    // create new stream if not provided
    stream = stream || gulp.src('');
    return stream
      .pipe($.shell([
        // needs explicit cross-platform path
        path.join('node_modules/ionic/bin/ionic ') + command
      ]));
  };

  function performChange (content) {
    var jsonObj = require('../.io-config.json');
    var SETTINGS_REPLACE_START = '\\\"IONIC_SETTINGS_STRING_START\\\";';
    var SETTINGS_REPLACE_END = '\\\"IONIC_SETTINGS_STRING_END\\\"';
    var SETTINGS_REPLACEMENT = 'return { get: function(setting) { if (settings[setting]) { return settings[setting]; } return null; } };';

    var replacementString = 'var settings = ' + JSON.stringify(jsonObj) + '; ' + SETTINGS_REPLACEMENT;
    return content.replace(new RegExp('(' + SETTINGS_REPLACE_START + ')(.*?)(' + SETTINGS_REPLACE_END + ')', 'g'), '$1' + replacementString + '$3');
  }

  gulp.task('change-ionic-files', changeIonicFiles);
  gulp.task('ionic', runIonicScript);

})();
