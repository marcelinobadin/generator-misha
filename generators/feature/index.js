(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var utils = require('../../utils/utils.js');
  var mkdirp = require('mkdirp');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      this.log('You called the misha:feature subgenerator.');

      // arguments
      this.argument('name', {
        required: true,
        type: String,
        desc: 'The subgenerator name'
      });
      this.argument('module', { type: String, required: false });

      this.moduleName = utils.checkModule(this.module);
      this.moduleFolder = utils.moduleFolder(this.moduleName);
      this.featureFileName = utils.fileName(this.name);
      this.featureControllerName = utils.controllerName(this.name); // used in the template
    },

    writing: function () {
      var featurePath = 'app/' + this.moduleFolder + '/' + this.featureFileName;
      this.composeWith('misha:controller', {
        arguments: this.name + ' ' + this.moduleName + ' ' + this.name
      });
      this.composeWith('misha:template', {
        arguments: this.name + ' ' + this.moduleName + ' ' + this.name
      });
      this.template('_feature.js', featurePath + '/' + this.featureFileName + '.js');
      mkdirp.sync(featurePath + '/assets');
      mkdirp.sync(featurePath + '/styles');
    }
  });
})();
