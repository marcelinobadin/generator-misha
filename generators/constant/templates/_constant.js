(function () {
  'use strict';

  var <%= constantName %> = {
<% if (options.template === 'config') { -%>
    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/
      /*endinject*/
    },
    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }
<% } else { -%>
    CONSTANT_1: 'meaningful value',
<% } -%>
  };

  angular
    .module('<%= moduleName %>')
    .constant('<%= constantName %>', <%= constantName %>);
})();
