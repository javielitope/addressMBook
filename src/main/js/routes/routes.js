var contactRoutes = angular.module('contactRoutes', ['ngRoute', 'contactControllers']);

// configure our routes
contactRoutes.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'views/list.html',
                controller  : 'contactCtrl'
            })

            // route for the form page
            .when('/contact', {
                templateUrl : 'views/form.html',
                controller  : 'contactCtrl'
            });
    });