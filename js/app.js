'use strict';

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
		// so that you can access them from any scope within your applications.
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
		
// 		$rootScope.$on('$routeChangeStart', function(evt, absNewUrl, absOldUrl){
//         	$window.scrollTo(0,0);    //scroll to top of page after each route change
// 		});
		

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
              title: "Researcher :personID"
            }
        })
        
        
        
        
    }
  ]
);

