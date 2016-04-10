describe('contactControllers Test', function() {
  var $httpBackend, $rootScope, createController, countriesHandler;
  var $cookies = {};
  var ctrl;


  beforeEach(function () {
        angular.mock.module('ngCookies','contactControllers');
        inject(function (_$httpBackend_, _$rootScope_, _$controller_, _$cookies_) {
            $httpBackend = _$httpBackend_;
            // backend definition common for all tests
            countriesHandler = $httpBackend.when('GET', '/countries')
                            .respond({countries: ["Argentina","Brazil"]});
            $scope = _$rootScope_.$new();
            $cookies = _$cookies_;

            ctrl = _$controller_('contactCtrl', {
                '$scope': $scope, '$cookies': $cookies
            })
        });
    });

  beforeEach(inject(function(_$cookies_){    
    // Setting a cookie for testing
    $cookies.getObject = function (name){
        var jsonReturn = {};
        return jsonReturn;
      };
  }));

  describe('Contacts Tests', function() {
    it('check contacts length', function() {
      expect($scope.contacts.length).toEqual(0);
      var newContact = {'firstname':'fTestName','lastname':'lTestName','email':'fake@email.com','country':'Albania'};
      $scope.addNew(newContact);
      expect($scope.contacts.length).toEqual(1);
      newContact.lastname = "newLastName";
      $scope.edit(newContact);
      expect($scope.contacts[0].lastname).toEqual("newLastName");
      expect($scope.contacts.length).toEqual(1);
      $scope.remove(newContact);
      expect($scope.contacts.length).toEqual(0);
    });
  });

  describe('Country Tests', function() {
    it('check a call is done to get countries', function() {
      $httpBackend.expectGET('/countries');
      $httpBackend.flush();
    });
  });
});