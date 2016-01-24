(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .controller('<%= controllerName %>', <%= controllerName %>);

  <%= controllerName %>.$inject = ['logger'<% if(options.template === 'debug') { %>, '<%= serviceName %>', '<%= configName %>', '$cordovaDevice'<% } %>];
  /* @ngInject */
  function <%= controllerName %> (logger<% if(options.template === 'debug') { %>, <%= serviceName %>, <%= configName %>, $cordovaDevice<% } %>) {
    logger.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);
<% if (options.template === 'debug') {-%>
    // bind data from services
    this.someData = <%= serviceName %>.someData;
    this.ENV = <%= configName %>.ENV;
    this.BUILD = <%= configName %>.BUILD;
    // get device info
    ionic.Platform.ready(function () {
      if (ionic.Platform.isWebView()) {
        this.device = $cordovaDevice.getDevice();
      }
    }.bind(this));
    // PASSWORD EXAMPLE
    this.password = {
      input: '', // by user
      strength: ''
    };
    this.grade = function () {
      var size = this.password.input.length;
      if (size > 8) {
        this.password.strength = 'strong';
      } else if (size > 3) {
        this.password.strength = 'medium';
      } else {
        this.password.strength = 'weak';
      }
    };
    this.grade();
<% } %>
  }
})();
