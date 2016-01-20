(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var utils = require('../../utils/utils.js');
  var config = require('../../utils/config.js');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      this.log('You called the misha:directive subgenerator.');

      // arguments
      this.argument('name', {
        required: true,
        type: String,
        desc: 'The subgenerator name'
      });
      this.argument('module', {type: String, required: false});
      this.argument('feature', {type: String, required: false, defaults: config.DEFAULT_FEATURE});

      this.moduleName = utils.checkModule(this.module);
      this.moduleFolder = utils.moduleFolder(this.moduleName + '/' + this.feature);

      this.directiveName = this.name;
      this.directiveTagName = utils.directiveTagName(this.directiveName);
      this.fileName = utils.fileName(this.directiveName);
    },

    writing: function () {
      // create directive with snake-case file name
      var folder = 'app/' + this.moduleFolder + '/';
      this.template('_directive.js', folder + this.fileName + '.directive.js');
      // create karma test file
      var testFolder = 'test/karma/' + this.moduleFolder + '/';
      this.template('_directive.spec.js', testFolder + this.fileName + '.directive.spec.js');
    }
  });
})();
