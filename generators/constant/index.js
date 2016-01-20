(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var utils = require('../../utils/utils.js');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      this.log('You called the misha:constant subgenerator.');

      // arguments
      this.argument('name', {
        required: true,
        type: String,
        desc: 'The subgenerator name'
      });
      this.argument('module', {type: String, required: false});
      this.argument('feature', {type: String, required: false});

      this.moduleName = utils.checkModule(this.module);
      this.moduleFolder = utils.moduleFolder(this.feature ? this.moduleName + '/' + this.feature : this.moduleName);

      this.constantName = this.name;
      this.fileName = utils.fileName(this.constantName);
    },

    writing: function () {
      // create constant with snake-case file name
      var folder = 'app/' + this.moduleFolder + '/';
      this.template('_constant.js', folder + this.fileName + '.constant.js');
    }
  });

})();
