(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .service('<%= serviceName %>', <%= serviceName %>);

  <%= serviceName %>.$inject = ['logger'<% if (options.template === 'debug') { %>, '$timeout'<% } %>];
  /* @ngInject */
  function <%= serviceName %> (logger<% if (options.template === 'debug') { %>, $timeout<% } %>) {

    logger.log('Hello from your Service: <%= serviceName %> in module <%= moduleName %>');

<% if(options.template === 'debug') { -%>
    // some initial data
    this.someData = {
      binding: 'Yes! Got that databinding working'
    };

    this.changeBriefly = function () {
      var initialValue = this.someData.binding;
      this.someData.binding = 'Yeah this was changed';
      var that = this;
      $timeout(function () {
        that.someData.binding = initialValue;
      }, 500);
    };
<% } -%>
  }
})();
