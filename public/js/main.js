
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

    scotchApp.controller('galleryController', function($scope,$http) {
      $scope.counts = [];

      $scope.images = [
        {
            id: 1,
            url: "img/frenchstand.jpeg",
            title: "French Provincial Night Stand"

        },
        {
            id: 2,
            url: "img/stand.jpeg",
            title: "Side Table For Sale"

        },
        {
            id: 3,
            url: "img/cool3.jpeg",
            title: "This is my Third cool image"

        },
        {
            id: 4,
            url: "img/cool4.jpeg",
            title: "This is my Fourth cool image"

        },
      ]

      //Get all likes 
      $http.get('/api/all_likes/')
        .success(function(likes) {
            $scope.images.forEach(function(img){
                likes.forEach(function(like){
                    if (img.id === like.id) {
                        img.likes = like.likes;
                    } else if (!img.likes) {
                        img.likes = 0;
                    }
                })
            })

            console.log($scope.images);
        }).error(function(error) {
            console.log('Error: ' + error);
        });

        $scope.favorite = function(image) {
            if (!image.been_liked) {
                image.likes += 1;    
                image.been_liked = true;
                $http.put('/api/update_likes/' + image.id, {likes:image.likes})
                    .success(function(data) {
                    $scope.todoData = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                } else {
                image.likes -= 1;
                $http.put('/api/update_likes/' + image.id, {likes:image.likes})
                    .success(function(data) {
                    $scope.todoData = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                image.been_liked = false;
            }
        }  
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact me at chelseafelter@yahoo.com';
    });
