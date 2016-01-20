(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .directive('<%= directiveName %>', <%= directiveName %>);

  /* @ngInject */
  function <%= directiveName %> () {
    var <%= directiveName %> = {
      template: '<div></div>',
      restrict: 'E',
      link: postLink
    }
    return <%= directiveName %>;
  }

  function postLink (scope, element, attrs) {
    element.text('this is the <%= directiveName %> directive', attrs);
  }
});
