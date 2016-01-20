(function () {
  'use strict';

  angular
    .module('<%= moduleName %>', [
      'ionic',
      'ngCordova',
      'ui.router'
      // TODO: load other modules selected during generation
    ])
    .run(<%= subModuleName %>Run);

  var otherwisePath = '';
<% if (options.mainModule && answers.template === 'blank') { -%>
  otherwisePath = '/<%= moduleFolder %>';
<%} else if (options.mainModule) { -%>
  otherwisePath = '/<%= moduleFolder %>/list';
<%} -%>

  <%= subModuleName %>Run.$inject = ['routerHelper'];
  /* @ngInject */
  function <%= subModuleName %>Run (routerHelper) {
    routerHelper.configureStates(getStates(), otherwisePath);
  }
  function getStates () {
    return [
      {
        state: '<%= moduleName %>',
        config: {
          url: '/<%= moduleFolder %>',
<% if (answers.template === 'blank') { -%>
          template: '<ion-view view-title="<%= subModuleName %>"></ion-view>',
          // templateUrl: '<%= moduleFolder %>/main/<someTemplate>.html',
          // controller: 'SomeCtrl as ctrl'
<%} else if (answers.template === 'sidemenu') { -%>
          abstract: true,
          templateUrl: '<%= moduleFolder %>/main/menu.html',
          controller: '<%= menuCtrlName %> as menu'
        }
      },
      {
        state: '<%= moduleName %>.list',
        config: {
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
          url: '/debug',
          views: {
            'pageContent': {
              templateUrl: '<%= moduleFolder %>/main/debug.html',
              controller: '<%= debugCtrlName %> as ctrl'
            }
          }
<%} else if (answers.template === 'tabs') { -%>
          abstract: true,
          templateUrl: '<%= moduleFolder %>/main/tabs.html'
        }
      },
      {
        state: '<%= moduleName %>.list',
        config: {
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
          url: '/debug',
          views: {
            'tab-debug': {
              templateUrl: '<%= moduleFolder %>/main/debug.html',
              controller: '<%= debugCtrlName %> as ctrl'
            }
          }
<% } -%>
        }
      }
    ];
  }
})();
