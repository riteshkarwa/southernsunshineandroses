
var scotchApp = angular.module('myApp', ['ngRoute','ui.bootstrap']);

    // create the controller and inject Angular's $scope

		// configure our routes
        scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            //route for blogs
            .when('/blog', {
                templateUrl : 'blog.html',
                controller  : 'blogController'
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

    scotchApp.controller('blogController', function($scope) {
        $scope.message = 'Look! I am a blog page.';
    });

    scotchApp.controller('galleryController', function($scope,$http) {
      $scope.counts = [];

      $scope.images = [
        {
            id: 1,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1463885824/frenchstand_dtiyhu.jpg",
            title: "French Provincial Night Stand"

        },
        {
            id: 2,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1463882123/stand_mkbg5e.jpg",
            title: "Side Table For Sale"

        },
        {
            id: 3,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1463885212/midcentury_kxvnrs.jpg",
            title: "Awesome Mid Century Table"

        },
        {
            id: 4,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1474155614/2tier_oldgo9.jpg",
            title: "Lovely two tiered French Provincial end table"

        },
        {
            id: 5,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1463882106/doggy_bed_u3jign.jpg",
            title: "Adorable bed for your pet"

        },
        {
            id: 6,
            url: "https://res.cloudinary.com/dkjcddqy0/image/upload/v1463881943/breadbox_gxioq9.jpg",
            title: "Cute bread box"

        },
        {   
            id:7,
            url:"https://res.cloudinary.com/dkjcddqy0/image/upload/v1473479543/image_1_kzwonl.jpg",
            title: "Piano bench to die for"
        },
        {
            id:8,
            url:"https://res.cloudinary.com/dkjcddqy0/image/upload/v1480115054/coffee_table_fpbrud.jpg",
            title: "Lovely and Drinkable Coffee Table"
        },
        {
            id:9,
            url:"https://res.cloudinary.com/dkjcddqy0/image/upload/v1511933009/24251248_10211316135001007_1093863881_o_ezqau5.jpg",
            title: "Prayer Table"
        },
        {
            id:10
            url:"https://res.cloudinary.com/dkjcddqy0/image/upload/v1512876034/25139095_10211396786417242_1175081066_o_pbw6el.jpg"
            title: "Solid Cherry Night Stands"
        }
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

            //console.log($scope.images);
        }).error(function(error) {
            console.log('Error: ' + error);
        });

        $scope.favorite = function(image) {
            console.log(image.id);
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
                } 
            else {
                image.likes -= 1;
                $http.put('/api/update_likes/' + image.id, {likes:image.likes})
                    .success(function(data) {
                    $scope.todoData = data;
                    //console.log(data);
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
