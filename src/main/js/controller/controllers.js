var contactControllers = angular.module('contactControllers', ['ngCookies']);

// define controller
contactControllers.controller('contactCtrl', ['$scope','$http','$cookies',
  function contactCtrl($scope, $http, $cookies) {
    
    // Retrieving the cookies that contains all contacts, and index of editedContact
    var contactsCookie = $cookies.getObject('contacts');
    if(contactsCookie == undefined){
        $scope.contacts = [];
    } else {
       $scope.contacts = contactsCookie;
       var index = $cookies.getObject('index');
       if(index !=undefined){
            $scope.editedContact = $scope.contacts[index]; 
            $scope.adding = false;
        } else {
            $scope.adding = true;
            $scope.editedContact = {};
        }
    }
    
    // get countries from nodejs server
    $http.get("/countries")
        .then(function(response) {
            $scope.countries = response.data;
        });    
    
    //DEFINE MANAGEMENT FUNCTIONS 
    // go to form.html with a clean contact   
    $scope.add = function () {
        $cookies.remove('index'); 
        $scope.adding = true;
        $scope.editedContact = {};
    }; 

    // store the new contact     
    $scope.addNew = function (contact) {
        $scope.contacts.push(contact);
        $scope.editedContact = undefined; 
        $scope.adding = false; 
        // Setting new 'contacts' cookie value
        $cookies.putObject('contacts', $scope.contacts);
        window.location = "#/";
    };
    
    //remove contact from contacts    
    $scope.remove = function (contact) { 
        var index = $scope.contacts.indexOf(contact);
        alert("Deleting index: " + index);
        $scope.contacts.splice(index, 1);
        $cookies.putObject('contacts', $scope.contacts);  
        window.location = "#/";    
    };
    
    //go to form.html with index item data
    $scope.edit = function (contact) { 
        $cookies.putObject('index', $scope.contacts.indexOf(contact)); 
        $scope.adding = false; 
        window.location = '#/contact';
    };
    
    // save updated contact
    $scope.save = function (contact) { 
        $scope.contacts.splice(index, 1);
        $scope.contacts.push(contact);
        $scope.adding = false;
        $cookies.putObject('contacts', $scope.contacts);
        $cookies.remove('index');
        window.location = "#/";
    };

    // cancel update/creation the new contact     
    $scope.cancel = function () {
        $cookies.remove('index');
        $scope.editedContact = undefined; 
        $scope.adding = false; 
        window.location = "#/";
    };
    
}]);