(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .run(<%= name %>Run);

  <%= name %>Run.$inject = ['routerHelper'];
  /* @ngInject */
  function <%= name %>Run (routerHelper) {
    routerHelper.configureStates(getStates());
  }
  function getStates () {
    return [
      {
        state: '<%= moduleName %>.<%= name %>',
        config: {
          parent: '<%= moduleName %>',
          url: '/<%= name %>',
          views: {
            'content@': {
              templateUrl: '<%= moduleFolder %>/<%= featureFileName %>/<%= featureFileName %>.html',
              controller: '<%= featureControllerName %>',
              controllerAs: 'ctrl'
            }
          }
        }
      }
    ];
  }
})();
