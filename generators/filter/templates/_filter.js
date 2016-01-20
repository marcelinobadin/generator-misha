(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .filter('<%= filterName %>', <%= filterName %>);

  /* @ngInject */
  function <%= filterName %> () {
    return _<%= filterName %>;
  }
  function _<%= filterName %> (input) {
    return '<%= filterName %> filter: ' + input;
  }
})();
