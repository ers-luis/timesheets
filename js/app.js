'use strict';
// 
// // declare top-level module which depends on filters,and services
// var myTime = angular.module('myTime',
//     [   'myTime.filters',
//         'myTime.directives', // custom directives
//         'ngGrid', // angular grid
//         'ui', // angular ui
// //        'ui.router', // angular ui router
// //        'ngGrid', // angular ui ng-Grid
//         'ngSanitize', // for html-bind in ckeditor
//         'ui.ace', // ace code editor
//         'ui.bootstrap', // jquery ui bootstrap
//         '$strap.directives', // angular strap
//         "xeditable" // angular xeditable
//     ]);
// 
// 
// 
// // bootstrap angular
// myTime.config(['$routeProvider', '$locationProvider', '$httpProvider', 
//     function (  $routeProvider,   $locationProvider,   $httpProvider) {
//     
// // STATIC PAGES
//     // HOME
//     $routeProvider.when('/', {
//         templateUrl:'tpl/static/home.html'
//     });
// 
//     // CONTACT
//     $routeProvider.when('/contact', {
//         templateUrl:'tpl/static/contact.html'
//     });
//     
//     // ABOUT
//     $routeProvider.when('/about', {
//         templateUrl:'tpl/static/about.html'
//     });
//     
//     // FAQ
//     $routeProvider.when('/faq', {
//         templateUrl:'tpl/static/faq.html'
//     });
//     
// // DYNAMIC PAGES
//     
//     // Projects
//     $routeProvider.when('/projects', {
//         templateUrl:'tpl/projects.html',
//         controller:'ProjectCtrl'
//     });
//     // ProjectsGrid
//     $routeProvider.when('/projectsGrid', {
//         templateUrl:'tpl/projectsGrid.html',
//         controller:'ProjectGridCtrl'
//     });
//     // Institutions
//     $routeProvider.when('/institutions', {
//         templateUrl:'tpl/institutions.html',
//         controller:'InstitutionCtrl'
//     });
//     // persons
//     $routeProvider.when('/persons', {
//         templateUrl:'tpl/persons.html',
//         controller:'PersonCtrl'
//     });
//     // workrelations
//     $routeProvider.when('/workrelations', {
//         templateUrl:'tpl/workrelations.html',
//         controller:'WRCtrl'
//     });
//     // bankaccounts
//     $routeProvider.when('/bankaccounts', {
//         templateUrl:'tpl/bankaccounts.html',
//         controller:'BACtrl'
//     });
//     // institutionaliases
//     $routeProvider.when('/institutionaliases', {
//         templateUrl:'tpl/institutionaliases.html',
//         controller:'InstitutionAliasCtrl'
//     });
//     // wps
//     $routeProvider.when('/wps', {
//         templateUrl:'tpl/wps.html',
//         controller:'WPCtrl'
//     });
//     // EU activities
//     $routeProvider.when('/euactivities', {
//         templateUrl:'tpl/euactivities.html',
//         controller:'EUActivityCtrl'
//     });
//     // institutionactivities
//     $routeProvider.when('/institutionactivities', {
//         templateUrl:'tpl/institutionactivities.html',
//         controller:'InstitutionActivityCtrl'
//     });
//     // timerecords
//     $routeProvider.when('/timerecords', {
//         templateUrl:'tpl/timerecords.html',
//         controller:'TimeRecordCtrl'
//     });
//     // clocks
//     $routeProvider.when('/clocks', {
//         templateUrl:'tpl/clocks.html',
//         controller:'ClockCtrl'
//     });
//     
//     // MY PANEL
//     $routeProvider.when('/mypanel/:roleID', {
//         templateUrl:'tpl/myPanel.html',
//         controller:'myPanelCtrl'
//     });
// 
// // DEFAULT
//     // by default, redirect to site root
//     $routeProvider.otherwise({
//         redirectTo:'/'
//     });
// 
// }]);
// 
// // this is run after angular is instantiated and bootstrapped
// myTime.run(function ($rootScope, $location, $http, $timeout, AuthService, RESTService, editableOptions) {
// 
// 	// x-editable options
// 	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
// 
//     // *****
//     // Eager load some data using simple REST client
//     // *****
// 
//     $rootScope.restService = RESTService;
// 
//     // async load constants
//     $rootScope.constants = [];
//     $rootScope.restService.get('data/constants.json', function (data) {
//             $rootScope.constants = data[0];
//         }
//     );
// 	console.log("async load constants");
// 
//     // async load FAQ
//     $rootScope.faq = [];
//     $rootScope.restService.get('data/faq.json', function (data) {
//             $rootScope.faq = data;
// 			console.log("async load FAQ");
//         }
//     );
// 
//     // async load temp user data
// //     $rootScope.userData = [];
// //     $rootScope.restService.get('data/temp_id.json', function (data) {
// //             $rootScope.userData = data[0];
// //         }
// //     );
// // 	console.log("async load userData");
// 
//     // async load temp projects data
// //     $rootScope.projects = [];
// //     $rootScope.restService.get('data/temp_project.json', function (data) {
// //             $rootScope.projects = data;
// // 			console.log("async load projects");
// //         }
// //     );
// 
//     // async load temp institutions data
// //     $rootScope.institutions = [];
// //     $rootScope.restService.get('data/temp_institution.json', function (data) {
// //             $rootScope.institutions = data;
// // 				console.log("async load institutions");
// //         }
// //     );
// 
//     // async load temp Persons data
// //     $rootScope.persons = [];
// //     $rootScope.restService.get('data/temp_person.json', function (data) {
// //             $rootScope.persons = data;
// // 				console.log("async load persons");
// //         }
// //     );
// 
//     // async load temp Work Relations data
// //     $rootScope.workrelations = [];
// //     $rootScope.restService.get('data/temp_workrelation.json', function (data) {
// //             $rootScope.workrelations = data;
// // 			console.log("async load workrelations");
// //         }
// //     );
// 
//     // async load temp Bank Accounts data
// //     $rootScope.bankaccounts = [];
// //     $rootScope.restService.get('data/temp_bankaccount.json', function (data) {
// //             $rootScope.bankaccounts = data;
// // 			console.log("async load bankaccounts");
// //         }
// //     );
// 
//     // async load temp Institution Aliases data
// //     $rootScope.institutionaliases = [];
// //     $rootScope.restService.get('data/temp_institutionalias.json', function (data) {
// //             $rootScope.institutionaliases = data;
// // 			console.log("async load inst aliases");
// //         }
// //     );
// 
//     // async load temp Work Packages data
// //     $rootScope.wps = [];
// //     $rootScope.restService.get('data/temp_wp.json', function (data) {
// //             $rootScope.wps = data;
// // 			console.log("async load wps");
// //         }
// //     );
// 
//     // async load temp eu activities data
// //     $rootScope.euactivities = [];
// //     $rootScope.restService.get('data/temp_euactivity.json', function (data) {
// //             $rootScope.euactivities = data;
// // 			console.log("async load euactivity");
// //         }
// //     );
// 
//     // async load temp institution activities data
// //     $rootScope.institutionactivities = [];
// //     $rootScope.restService.get('data/temp_institutionactivity.json', function (data) {
// //             $rootScope.institutionactivities = data;
// // 			console.log("async load inst activity");
// //         }
// //     );
// 
//     // async load temp timerecords data
// //     $rootScope.timerecords = [];
// //     $rootScope.restService.get('data/temp_timerecord.json', function (data) {
// //             $rootScope.timerecords = data;
// // 			console.log("async load timerecords");
// //         }
// //     );
// 
//     // async load temp clocks data
// //     $rootScope.clocks = [];
// //     $rootScope.restService.get('data/temp_clock.json', function (data) {
// //             $rootScope.clocks = data;
// // 			console.log("async load clock");
// //         }
// //     );
// 
//     // *****
//     // Initialize authentication
//     // *****
//     $rootScope.authService = AuthService;
// 
//     // text input for login/password (only)
//     $rootScope.loginInput = 'user@gmail.com';
//     $rootScope.passwordInput = 'complexpassword';
// 
//     $rootScope.$watch('authService.authorized()', function () {
// 
//         // if never logged in, do nothing (otherwise bookmarks fail)
//         if ($rootScope.authService.initialState()) {
//             // we are public browsing
//             return;
//         }
// 
//         // instantiate and initialize an auth notification manager
//         $rootScope.authNotifier = new NotificationManager($rootScope);
// 
//         // when user logs in, redirect to home
//         if ($rootScope.authService.authorized()) {
//             $location.path("/");
//             $rootScope.authNotifier.notify('information', 'Welcome ' + $rootScope.authService.currentUser() + "!");
//         }
// 
//         // when user logs out, redirect to home
//         if (!$rootScope.authService.authorized()) {
//             $location.path("/");
//             $rootScope.authNotifier.notify('information', 'Thanks for visiting.  You have been signed out.');
//         }
// 
//     }, true);
// 
// });

// Make sure to include the `ui.router` module as a dependency

var myTime = angular.module('myTime',
    [   'myTime.filters', // custom filters
        'myTime.directives', // custom directives
        'ngGrid', // angular grid
        'ui', // angular ui
        'ui.router', // angular ui router
        'ngSanitize', // for html-bind in ckeditor
        'ui.ace', // ace code editor
        'ui.bootstrap', // jquery ui bootstrap
        '$strap.directives', // angular strap
        "xeditable" // angular xeditable
    ]);


var filters = angular.module('myTime.filters', []);
var directives = angular.module('myTime.directives', []);

myTime.run(
  [          '$rootScope', '$state', '$stateParams', '$location', '$http', '$timeout', 'AuthService', 'RESTService', '$filter', 'editableOptions', 'Utils', 'ProjectService', 'WorkPackageService', 'ActivityEUService', 'PersonService', 'InstitutionService', 'InstitutionActivityService', 'WorkRelationService',
    function ($rootScope,   $state,   $stateParams,   $location,   $http,   $timeout,   AuthService,   RESTService,   $filter,   editableOptions,   Utils,   ProjectService,   WorkPackageService,   ActivityEUService,   PersonService,   InstitutionService,   InstitutionActivityService,   WorkRelationService) {

		
		// x-editable options
		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
		
		// It's very handy to add references to $state and $stateParams to the $rootScope
		// so that you can access them from any scope within your applications.For example,
		// <li ui-sref-active="active }"> will set the <li> // to active whenever
		// 'contacts.list' or one of its decendents is active.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
// 		$rootScope.myResolver = function (defaultResolver, state, isCurrent) {
// 			if (isCurrent) {
// 				return ' "' + $state.title + '" ';
// // 				return '"' + $state.title + '"';
// // 				return 'Home ';
// 			}
// 			return defaultResolver(state);
// 		}

		// *****
		// Eager load some data using simple REST client
		// *****

		$rootScope.restService = RESTService;
		
		$rootScope.projectService = ProjectService;
		$rootScope.wpService = WorkPackageService;
		$rootScope.aeuService = ActivityEUService;
		$rootScope.personService = PersonService;
		$rootScope.institutionService = InstitutionService;
		$rootScope.wrService = WorkRelationService;
		$rootScope.iaService = InstitutionActivityService;

		// async load constants
		$rootScope.constants = [];
		$rootScope.restService.get('data/constants.json', function (data) {
				$rootScope.constants = data[0];
				console.log("async load constants");
			}
		);

		// async load FAQ
		$rootScope.faq = [];
		$rootScope.restService.get('data/faq.json', function (data) {
				$rootScope.faq = data;
				console.log("async load FAQ");
			}
		);
		
		$rootScope.title = "";
		$rootScope.$on('stateChangeStart', function(event, toState) {
			$rootScope.title = toState.data.title;
		});
		

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
// 				$location.path("/");
				$rootScope.authNotifier.notify('information', 'Welcome ' + $rootScope.authService.currentUser() + "!");
			}

			// when user logs out, redirect to home
			if (!$rootScope.authService.authorized()) {
				$location.path("/");
				$rootScope.authNotifier.notify('information', 'Thanks for visiting.  You have been signed out.');
			}

		}, true);
    }
  ]
);

myTime.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
    


      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
//         .when('/u?id', '/persons/:id')
//         .when('/user/:id', '/persons/:id')
//         .when('/p?id', '/projects/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {
          url: "/",
          views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateUrl: "tpl/static/home.html"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
           },
           data: {
             title: 'Home'
           }

        })

        /////////
        // FAQ //
        /////////

        .state("faq", {
          url: "/faq",
          views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateUrl: "tpl/static/faq.html"
                },
                'footer@': {
                    templateUrl: "tpl/navbar-bottom.html"
                }
           },
           data: {
             title: 'F.A.Q.'
           }

        })

        /////////////
        // Contact //
        /////////////

        .state("contact", {
          url: "/contact",
          views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateUrl: "tpl/static/contact.html"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
           },
           data: {
             title: 'Contact'
           }

        })

        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',
          views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateProvider: ['$timeout',
					function (        $timeout) {
					  return $timeout(function () {
						return '<p class="lead">UI-Router Resources</p><ul>' +
								 '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
								 '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
								 '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
								 '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
								 '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
							   '</ul>';
					  }, 100);
					}]
                },
                'footer@': {
                  templateUrl: 'tpl/navbar-bottom.html'
                }
           },
           data: {
             title: 'Contact'
           }
        })
        

        //////////////
        // Projects //
        //////////////
        
        .state("projectsgrid", {
            url: "/projectsgrid",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                    templateUrl: 'tpl/projectsGrid.html',
                    controller: "ProjectGridCtrl"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
            },
            data: {
              title: 'Projects Grid'
            }
        })
        

        /////////////
        // Persons //
        /////////////
        
        .state("persons", {
            url: "/persons",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                    templateUrl: 'tpl/persons.html',
                    controller: "PersonsCtrl"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
            },
            data: {
              title: 'Persons'
            }
        })
        

        //////////////////////
        // Persons > Person //
        //////////////////////
        
        .state("persons.person", {
            url: "/:personID",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateUrl: "tpl/person.html",
                  controller: "PersonCtrl"
                },
                'footer@': {
                  templateUrl: "tpl/navbar-bottom.html"
                }
            },
//             resolve: {
//                 'ProjectServiceData':function(ProjectService){
//                     return ProjectService.promise;
//                 }
//             },
            data: {
              title: '/:personID'
            }
        })
        

        ///////////////////////////
        // Persons > Person > WR //
        ///////////////////////////
        
        .state("persons.person.wr", {
            url: "/:wrID",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                  templateUrl: "tpl/person.wr.html",
                  controller: "PersonWRCtrl"
                },
                'footer@': {
                  templateUrl: "tpl/navbar-bottom.html"
                }
            },
//             resolve: {
//                 'ProjectServiceData':function(ProjectService){
//                     return ProjectService.promise;
//                 },
//                 'ProjectServiceData':function(WPService){
//                     return WPService.promise;
//                 },
//                 'ProjectServiceData':function(ActivityEUService){
//                     return ActivityEUService.promise;
//                 },
//                 'ProjectServiceData':function(PersonService){
//                     return PersonService.promise;
//                 }
//             },
            data: {
              title: '/:wrID'
            }
        })
        

        //////////////
        // Projects //
        //////////////
        
        .state("projects", {
            url: "/projects",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                    templateUrl: 'tpl/projects.html',
                    controller: "ProjectCtrl"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
            },
            data: {
              title: 'Projects'
            }
        })
        

        //////////////////
        // Institutions //
        //////////////////
        
        .state("institutions", {
            url: "/institutions",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                    templateUrl: 'tpl/institutions.html',
                    controller: "InstitutionCtrl"
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
            },
            data: {
              title: 'Institutions'
            }
        })
        

        //////////////
        // My Panel //
        //////////////
        
        .state("researcher", {
            url: "/res/:personID",
            views: {
                'nav@': {
                  templateUrl: "tpl/navbar-top.html"
                },
                'main@': {
                    templateUrl: 'tpl/researcher.html',
                    controller: "ResearcherCtrl"
                },
                'sidebar@': {
                    templateUrl: 'tpl/res-sidebar.html'
                },
                'footer@': {
                    templateUrl: 'tpl/navbar-bottom.html'
                }
            },
            data: {
              title: ":personID"
            }
        })
        
        
        
        
    }
  ]
);

