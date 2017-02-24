(function () {
  'use strict';

  angular
    .module('manageinfocontacts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manageinfocontacts', {
        abstract: true,
        url: '/manageinfocontacts',
        template: '<ui-view/>'
      })
      .state('manageinfocontacts.list', {
        url: '',
        templateUrl: 'modules/manageinfocontacts/client/views/list-manageinfocontacts.client.view.html',
        controller: 'ManageinfocontactsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Manageinfocontacts List'
        }
      })
      .state('manageinfocontacts.create', {
        url: '/create',
        templateUrl: 'modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html',
        controller: 'ManageinfocontactsController',
        controllerAs: 'vm',
        resolve: {
          manageinfocontactResolve: newManageinfocontact
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Manageinfocontacts Create'
        }
      })
      .state('manageinfocontacts.edit', {
        url: '/:manageinfocontactId/edit',
        templateUrl: 'modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html',
        controller: 'ManageinfocontactsController',
        controllerAs: 'vm',
        resolve: {
          manageinfocontactResolve: getManageinfocontact
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Manageinfocontact {{ manageinfocontactResolve.name }}'
        }
      })
      .state('manageinfocontacts.view', {
        url: '/:manageinfocontactId',
        templateUrl: 'modules/manageinfocontacts/client/views/view-manageinfocontact.client.view.html',
        controller: 'ManageinfocontactsController',
        controllerAs: 'vm',
        resolve: {
          manageinfocontactResolve: getManageinfocontact
        },
        data: {
          pageTitle: 'Manageinfocontact {{ manageinfocontactResolve.name }}'
        }
      });
  }

  getManageinfocontact.$inject = ['$stateParams', 'ManageinfocontactsService'];

  function getManageinfocontact($stateParams, ManageinfocontactsService) {
    return ManageinfocontactsService.get({
      manageinfocontactId: $stateParams.manageinfocontactId
    }).$promise;
  }

  newManageinfocontact.$inject = ['ManageinfocontactsService'];

  function newManageinfocontact(ManageinfocontactsService) {
    return new ManageinfocontactsService();
  }
}());
