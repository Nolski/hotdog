angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.mood', {
      url: "/mood",
      views: {
        'home-tab': {
          templateUrl: "templates/mood.html"
        }
      }
    })
    .state('tabs.adventure', {
      url: "/adventure",
      views: {
        'home-tab': {
          templateUrl: "templates/adventure.html",
          controller: 'AdvCtrl',
        }
      }
    })
    .state('tabs.relaxed', {
      url: "/relaxed",
      views: {
        'home-tab': {
          templateUrl: "templates/relaxed.html",
          controller: 'AdvCtrl',
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html",
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})

.controller('AdvCtrl', function ($scope) {
  console.log(startNavigation);
  startNavigation();
});
