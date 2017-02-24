(function () {
  'use strict';

  // Manageinfocontacts controller
  angular
    .module('manageinfocontacts')
    .controller('ManageinfocontactsController', ManageinfocontactsController);

  ManageinfocontactsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'manageinfocontactResolve'];

  function ManageinfocontactsController ($scope, $state, $window, Authentication, manageinfocontact) {
    var vm = this;

    vm.authentication = Authentication;
    vm.manageinfocontact = manageinfocontact;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Manageinfocontact
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.manageinfocontact.$remove($state.go('manageinfocontacts.list'));
      }
    }

    // Save Manageinfocontact
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.manageinfocontactForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.manageinfocontact._id) {
        vm.manageinfocontact.$update(successCallback, errorCallback);
      } else {
        vm.manageinfocontact.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('manageinfocontacts.view', {
          manageinfocontactId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
