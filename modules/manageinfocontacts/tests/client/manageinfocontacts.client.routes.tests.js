(function () {
  'use strict';

  describe('Manageinfocontacts Route Tests', function () {
    // Initialize global variables
    var $scope,
      ManageinfocontactsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ManageinfocontactsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ManageinfocontactsService = _ManageinfocontactsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('manageinfocontacts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/manageinfocontacts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ManageinfocontactsController,
          mockManageinfocontact;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('manageinfocontacts.view');
          $templateCache.put('modules/manageinfocontacts/client/views/view-manageinfocontact.client.view.html', '');

          // create mock Manageinfocontact
          mockManageinfocontact = new ManageinfocontactsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manageinfocontact Name'
          });

          // Initialize Controller
          ManageinfocontactsController = $controller('ManageinfocontactsController as vm', {
            $scope: $scope,
            manageinfocontactResolve: mockManageinfocontact
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:manageinfocontactId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.manageinfocontactResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            manageinfocontactId: 1
          })).toEqual('/manageinfocontacts/1');
        }));

        it('should attach an Manageinfocontact to the controller scope', function () {
          expect($scope.vm.manageinfocontact._id).toBe(mockManageinfocontact._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/manageinfocontacts/client/views/view-manageinfocontact.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ManageinfocontactsController,
          mockManageinfocontact;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('manageinfocontacts.create');
          $templateCache.put('modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html', '');

          // create mock Manageinfocontact
          mockManageinfocontact = new ManageinfocontactsService();

          // Initialize Controller
          ManageinfocontactsController = $controller('ManageinfocontactsController as vm', {
            $scope: $scope,
            manageinfocontactResolve: mockManageinfocontact
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.manageinfocontactResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/manageinfocontacts/create');
        }));

        it('should attach an Manageinfocontact to the controller scope', function () {
          expect($scope.vm.manageinfocontact._id).toBe(mockManageinfocontact._id);
          expect($scope.vm.manageinfocontact._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ManageinfocontactsController,
          mockManageinfocontact;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('manageinfocontacts.edit');
          $templateCache.put('modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html', '');

          // create mock Manageinfocontact
          mockManageinfocontact = new ManageinfocontactsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manageinfocontact Name'
          });

          // Initialize Controller
          ManageinfocontactsController = $controller('ManageinfocontactsController as vm', {
            $scope: $scope,
            manageinfocontactResolve: mockManageinfocontact
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:manageinfocontactId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.manageinfocontactResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            manageinfocontactId: 1
          })).toEqual('/manageinfocontacts/1/edit');
        }));

        it('should attach an Manageinfocontact to the controller scope', function () {
          expect($scope.vm.manageinfocontact._id).toBe(mockManageinfocontact._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/manageinfocontacts/client/views/form-manageinfocontact.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
