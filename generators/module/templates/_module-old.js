(function () {
  'use strict';

  angular
    .module('<%= moduleName %>', [
      'ionic',
      'ngCordova',
      'ui.router'
      // TODO: load other modules selected during generation
    ])
    .config(<%= subModuleName %>Config);

  <%= subModuleName %>Config.$inject = ['$stateProvider'<% if (options.mainModule) {%>, '$urlRouterProvider'<%} %>];
  /* @ngInject */
  function <%= subModuleName %>Config ($stateProvider<% if (options.mainModule) {%>, $urlRouterProvider<%} %>) {

    // ROUTING with ui.router
<% if (options.mainModule && answers.template === 'blank') { -%>
    $urlRouterProvider.otherwise('/<%= moduleFolder %>');
<%} else if (options.mainModule) { -%>
    $urlRouterProvider.otherwise('/<%= moduleFolder %>/list');
<%} -%>
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('<%= subModuleName %>', {
        url: '/<%= moduleFolder %>',
<% if (answers.template === 'blank') { -%>
        template: '<ion-view view-title="<%= subModuleName %>"></ion-view>',
        // templateUrl: '<%= moduleFolder %>/main/<someTemplate>.html',
        // controller: 'SomeCtrl as ctrl'
      });
<%} else if (answers.template === 'sidemenu') { -%>
        abstract: true,
        templateUrl: '<%= moduleFolder %>/main/menu.html',
        controller: '<%= menuCtrlName %> as menu'
      })
      .state('<%= subModuleName %>.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/main/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('<%= subModuleName %>.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/main/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('<%= subModuleName %>.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/main/debug.html',
            controller: '<%= debugCtrlName %> as ctrl'
          }
        }
      });
<%} else if (answers.template === 'tabs') { -%>
        abstract: true,
        templateUrl: '<%= moduleFolder %>/main/tabs.html'
      })
      .state('<%= subModuleName %>.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: '<%= moduleFolder %>/main/list.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('<%= subModuleName %>.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: '<%= moduleFolder %>/main/list-detail.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('<%= subModuleName %>.debug', {
        url: '/debug',
        views: {
          'tab-debug': {
            templateUrl: '<%= moduleFolder %>/main/debug.html',
            controller: '<%= debugCtrlName %> as ctrl'
          }
        }
      });
<% } -%>
  }
})();
