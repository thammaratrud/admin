// Manageinfocontacts service used to communicate Manageinfocontacts REST endpoints
(function () {
  'use strict';

  angular
    .module('manageinfocontacts')
    .factory('ManageinfocontactsService', ManageinfocontactsService);

  ManageinfocontactsService.$inject = ['$resource'];

  function ManageinfocontactsService($resource) {
    return $resource('api/manageinfocontacts/:manageinfocontactId', {
      manageinfocontactId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
