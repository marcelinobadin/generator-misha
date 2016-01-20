(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var utils = require('../../utils/utils.js');
  var config = require('../../utils/config.js');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      this.log('You called the misha:controller subgenerator.');

      // arguments
      this.argument('name', {
        required: true,
        type: String,
        desc: 'The subgenerator name'
      });
      this.argument('module', {type: String, required: false});
      this.argument('feature', {type: String, required: false, defaults: config.DEFAULT_FEATURE});

      this.moduleName = utils.checkModule(this.module);
      this.serviceName = utils.serviceName(this.moduleName);
      this.configName = utils.configName(this.moduleName);
      this.moduleFolder = utils.moduleFolder(this.moduleName + '/' + this.feature);

      this.controllerName = utils.controllerName(this.name);
      this.fileName = utils.fileName(this.controllerName.substr(0, this.controllerName.lastIndexOf(config.CONTROLLER_SUFFIX)));
    },

    writing: function () {
      // create controller with snake-case file name
      var folder = 'app/' + this.moduleFolder + '/';
      this.template('_controller.js', folder + this.fileName + '.controller.js');
      // create karma test file
      var testFolder = 'test/karma/' + this.moduleFolder + '/';
      this.template('_controller.spec.js', testFolder + this.fileName + '.controller.spec.js');
    }
  });
})();
