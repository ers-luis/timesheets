'use strict';

// declare top-level module which depends on filters,and services
var myTime = angular.module('myTime',
    [   'myTime.filters',
        'myTime.directives', // custom directives
        'ngGrid', // angular grid
        'ui', // angular ui
        'ngSanitize', // for html-bind in ckeditor
        'ui.ace', // ace code editor
        'ui.bootstrap', // jquery ui bootstrap
        '$strap.directives' // angular strap
    ]);


var filters = angular.module('myTime.filters', []);
var directives = angular.module('myTime.directives', []);

// bootstrap angular
myTime.config(['$routeProvider', '$locationProvider', '$httpProvider', 
    function (  $routeProvider,   $locationProvider,   $httpProvider) {
    
// STATIC PAGES
    // HOME
    $routeProvider.when('/', {
        templateUrl:'tpl/static/home.html'
    });

    // CONTACT
    $routeProvider.when('/contact', {
        templateUrl:'tpl/static/contact.html'
    });
    
    // ABOUT
    $routeProvider.when('/about', {
        templateUrl:'tpl/static/about.html'
    });
    
    // FAQ
    $routeProvider.when('/faq', {
        templateUrl:'tpl/static/faq.html'
    });
    
// DYNAMIC PAGES
    
    // Projects
    $routeProvider.when('/projects', {
        templateUrl:'tpl/projects.html'
    });
    // MY PANEL
    $routeProvider.when('/mypanel/:roleID', {
        templateUrl:'tpl/myPanel.html',
        controller:'myPanelCtrl'
    });

// DEFAULT
    // by default, redirect to site root
    $routeProvider.otherwise({
        redirectTo:'/'
    });

}]);

// this is run after angular is instantiated and bootstrapped
myTime.run(function ($rootScope, $location, $http, $timeout, AuthService, RESTService) {

    // *****
    // Eager load some data using simple REST client
    // *****

    $rootScope.restService = RESTService;

    // async load constants
    $rootScope.constants = [];
    $rootScope.restService.get('data/constants.json', function (data) {
            $rootScope.constants = data[0];
        }
    );

    // async load constants
    $rootScope.faq = [];
    $rootScope.restService.get('data/faq.json', function (data) {
            $rootScope.faq = data;
        }
    );

    // async load temp user data
    $rootScope.userData = [];
    $rootScope.restService.get('data/temp_id.json', function (data) {
            $rootScope.userData = data[0];
        }
    );

    // async load temp projects data
    $rootScope.projects = [];
    $rootScope.restService.get('data/temp_project.json', function (data) {
            $rootScope.projects = data;
        }
    );

    // *****
    // Initialize authentication
    // *****
    $rootScope.authService = AuthService;

    // text input for login/password (only)
    $rootScope.loginInput = 'user@gmail.com';
    $rootScope.passwordInput = 'complexpassword';

    $rootScope.$watch('authService.authorized()', function () {

        // if never logged in, do nothing (otherwise bookmarks fail)
        if ($rootScope.authService.initialState()) {
            // we are public browsing
            return;
        }

        // instantiate and initialize an auth notification manager
        $rootScope.authNotifier = new NotificationManager($rootScope);

        // when user logs in, redirect to home
        if ($rootScope.authService.authorized()) {
            $location.path("/");
            $rootScope.authNotifier.notify('information', 'Welcome ' + $rootScope.authService.currentUser() + "!");
        }

        // when user logs out, redirect to home
        if (!$rootScope.authService.authorized()) {
            $location.path("/");
            $rootScope.authNotifier.notify('information', 'Thanks for visiting.  You have been signed out.');
        }

    }, true);
    

});

  


