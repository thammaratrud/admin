(function () {
  'use strict';

  angular
    .module('manageinfocontacts')
    .controller('ManageinfocontactsListController', ManageinfocontactsListController);

  ManageinfocontactsListController.$inject = ['ManageinfocontactsService'];

  function ManageinfocontactsListController(ManageinfocontactsService) {
    var vm = this;

    vm.manageinfocontacts = ManageinfocontactsService.query();
  }
}());
