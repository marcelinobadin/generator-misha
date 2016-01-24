(function () {
  'use strict';

  angular
    .module('<%= moduleName %>', [
      'ionic',
      'ngCordova',
      'ui.router', // #new-module --- Add new selected modules during generation -- Do not edit or remove this line. (TODO)
      'blocks.router',
      'blocks.logger',
      'blocks.exception'
    ])
    .run(<%= subModuleName %>Run);

<% if (options.mainModule && answers.template === 'blank') { -%>
  var otherwisePath = '/<%= moduleFolder %>/main';
<%} else if (options.mainModule) { -%>
  var otherwisePath = '/<%= moduleFolder %>/list';
<%} -%>

  <%= subModuleName %>Run.$inject = ['routerHelper'];
  /* @ngInject */
  function <%= subModuleName %>Run (routerHelper) {
<% if (options.mainModule) { -%>
    routerHelper.configureStates(getStates(), otherwisePath);
<%} else { -%>
    routerHelper.configureStates(getStates());
<%} -%>
  }
  function getStates () {
    return [
      {
        state: '<%= moduleName %>',
        config: {
          abstract: true,
<% if (!options.mainModule && subModuleName !== moduleName) { -%>
          parent: '<%= parentModuleName %>',
          url: '/<%= subModuleFolder %>',
<%} else {-%>
          url: '/<%= moduleFolder %>',
<%} -%>
<% if (answers.template === 'sidemenu') { -%>
          views: {
            'content@': {
              templateUrl: '<%= moduleFolder %>/main/menu.html',
              controller: '<%= menuCtrlName %>',
              controllerAs: 'menu'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.list',
        config: {
          parent: '<%= moduleName %>',
          url: '/list',
          views: {
            'pageContent': {
              templateUrl: '<%= moduleFolder %>/main/list.html'
              // controller: '<someCtrl> as ctrl'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.listDetail',
        config: {
          parent: '<%= moduleName %>',
          url: '/list/detail',
          views: {
            'pageContent': {
              templateUrl: '<%= moduleFolder %>/main/list-detail.html'
              // controller: '<someCtrl> as ctrl'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.debug',
        config: {
          parent: '<%= moduleName %>',
          url: '/debug',
          views: {
            'pageContent': {
              templateUrl: '<%= moduleFolder %>/main/debug.html',
              controller: '<%= debugCtrlName %>',
              controllerAs: 'ctrl'
            }
          }
<%} else if (answers.template === 'tabs') { -%>
          views: {
            'content@': {
              templateUrl: '<%= moduleFolder %>/main/tabs.html'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.list',
        config: {
          parent: '<%= moduleName %>',
          url: '/list',
          views: {
            'tab-list': {
              templateUrl: '<%= moduleFolder %>/main/list.html'
              // controller: 'SomeCtrl as ctrl'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.listDetail',
        config: {
          parent: '<%= moduleName %>',
          url: '/list/detail',
          views: {
            'tab-list': {
              templateUrl: '<%= moduleFolder %>/main/list-detail.html'
              // controller: 'SomeCtrl as ctrl'
            }
          }
        }
      },
      {
        state: '<%= moduleName %>.debug',
        config: {
          parent: '<%= moduleName %>',
          url: '/debug',
          views: {
            'tab-debug': {
              templateUrl: '<%= moduleFolder %>/main/debug.html',
              controller: '<%= debugCtrlName %>',
              controllerAs: 'ctrl'
            }
          }
<% } -%>
        }
      }
    ];
  }
})();
