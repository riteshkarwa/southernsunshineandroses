
var scotchApp = angular.module('myApp', ['ngRoute']);

    // create the controller and inject Angular's $scope

		// configure our routes
        scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'contact.html',
                controller  : 'contactController'
            })

            // route for the gallery page
            .when('/gallery', {
                templateUrl : 'gallery.html',
                controller  : 'galleryController'
            });
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('galleryController', function($scope) {
        $scope.message = 'Look! Here for my work.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact me at chelseafelter@yahoo.com';
    });
