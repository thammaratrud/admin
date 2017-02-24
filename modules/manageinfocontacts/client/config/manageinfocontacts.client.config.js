(function () {
  'use strict';

  angular
    .module('manageinfocontacts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Manageinfocontacts',
      state: 'manageinfocontacts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'manageinfocontacts', {
      title: 'List Manageinfocontacts',
      state: 'manageinfocontacts.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'manageinfocontacts', {
      title: 'Create Manageinfocontact',
      state: 'manageinfocontacts.create',
      roles: ['user']
    });
  }
}());
