
myTime.controller('ProjectGridCtrl', ['$rootScope', '$scope', '$routeParams', '$http', function ($rootScope, $scope, $routeParams, $http) {

	function createDataGrid($scope, $http, dataUrl) {

		$scope.filterOptions = {
			filterText: "",
			useExternalFilter: true
		};

		$scope.pagingOptions = {
			pageSizes: [10, 25, 100],
			pageSize: 10,
			totalServerItems: 15,
			currentPage: 1
		};

		$scope.getPagedDataAsync = function (pageSize, page, searchText) {
			setTimeout(

				function () {
					var data;
					if (searchText) {
						var ft = searchText.toLowerCase();
						$http.get(dataUrl)
							.success(

							function (servicesJson) {
								data = servicesJson.filter(function (item) {
									return JSON.stringify(
											item)
										.toLowerCase()
										.indexOf(
											ft) != -1;
								});
								$scope.setPagingData(
									data,
									page,
									pageSize);
							});
					} else {
						$http.get(dataUrl).success(

							function (servicesJson) {
								// window.alert(servicesJson);
								$scope.setPagingData(
									servicesJson, page,
									pageSize);
							});
					}
				}, 100);
		};

		$scope.setPagingData = function (data, page, pageSize) {
			var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
			$scope.servicesData = pagedData;
			$scope.pagingOptions.totalServerItems = data.length;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		};

		$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
			$scope.pagingOptions.currentPage);

		$scope.$watch('pagingOptions', function () {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
				$scope.pagingOptions.currentPage,
				$scope.filterOptions.filterText);
		}, true);
		$scope.$watch('filterOptions', function () {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
				$scope.pagingOptions.currentPage,
				$scope.filterOptions.filterText);
		}, true);

		$scope.mySelections = [];

		$scope.serviceName = "";
		$scope.url = "";

		$scope.gridOptions = {
			canSelectRows: false,
			enableCellEdit: true,
			multiSelect: false,
// 			jqueryUITheme: true,
			displaySelectionCheckbox: false,
			data: 'servicesData',
			selectedItems: $scope.mySelections,
			enablePaging: true,
			pagingOptions: $scope.pagingOptions,
			filterOptions: $scope.filterOptions
		};
	}
	
	// data grid
 	createDataGrid($scope, $http, 'data/temp_project.json');
// 	createDataGrid($scope, $http, $scope.projects);

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	
}]);




// Project Controller

myTime.controller('ProjectCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp projects data
    $scope.projects = [];
    $scope.restService.get('data/temp_project.json', function (data) {
            $scope.projects = data;
			console.log("async load projects");
        }
    );
    
}]);




// Institution Controller

myTime.controller('InstitutionCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp institutions data
//     $scope.institutions = [];
//     $scope.restService.get('data/temp_institution.json', function (data) {
//             $scope.institutions = data;
//         }
//     );
    $scope.institutions = [];
    $scope.restService.get('http://localhost:8080/timesheets/api/index.php/inst', function (data) {
            $scope.institutions = data;
        }
    );
    

}]);




// Persons Controller

myTime.controller('PersonsCtrl', ['$stateParams', '$scope', '$routeParams', '$http', 'Utils', function ($stateParams, $scope, $routeParams, $http, Utils) {

    // async load temp institutions data
    $scope.institutions = [];
//     $scope.restService.get('data/temp_institution.json', function (data) {
//             $scope.institutions = data;
//         }
//     );
    $scope.restService.get('http://localhost:8080/timesheets/api/index.php/inst', function (data) {
            $scope.institutions = data;
        }
    );

    // async load temp Persons data
    $scope.persons = [];
//     $scope.restService.get('data/temp_person.json', function (data) {
//             $scope.persons = data;
//         }
//     );
//     $scope.persons = $scope.personService.list();
    $scope.restService.get('http://localhost:8080/timesheets/api/index.php/person', function (data) {
            $scope.persons = data;
        }
    );

    // async load temp Work Relations data
    $scope.workrelations = [];
    $scope.restService.get('data/temp_workrelation.json', function (data) {
            $scope.workrelations = data;
        }
    );
    
//     $scope.selectedInstitution = {};
//     $scope.selectedPerson = {};
//     $scope.selectedWorkRelation = {};
//     
//     $scope.listSelectedInstitution = [];
//     $scope.listSelectedPerson = [];
//     $scope.listSelectedWorkRelation = [];
//     
// 	$scope.$watch('selectedInstitution', function () {
// 		$scope.restService.get('data/temp_workrelation.json', function (data) {
// 				$scope.listSelectedWorkRelation = data.filter(function(d){
// 			        return d.institutionid == $scope.selectedInstitution.id;
// 			    });
// 			}
// 		);
// 	}, true);

		
// 	$scope.myResolver = function (defaultResolver, state, isCurrent) {
// 		if (isCurrent) {
// 			return ' Persons ';
// 		}
// 		return defaultResolver(state);
// 	}

	
}]);




// Person Controller

myTime.controller('PersonCtrl', ['$scope', '$routeParams', '$stateParams', '$http', 'ProjectService', function ($scope, $routeParams, $stateParams, $http, ProjectService) {

	console.log("Load Person Controller for Person ID: " + $stateParams.personID);
// 	console.log($scope.state.title);
	
	// Get Person
// 	$scope.person = $scope.personService.get($stateParams.personID);
	$scope.restService.get('http://localhost:8080/timesheets/api/index.php/person/'+$stateParams.personID, function (data) {
            $scope.person = data;
            
            console.log($scope.person.name);
			$scope.person.workrelations = [];
			$scope.person.workrelations = $scope.wrService.getByPers($scope.person.id);

			_.each($scope.person.workrelations, function(wr){
				wr.project = {};
				$scope.restService.get('http://localhost:8080/timesheets/api/index.php/project/'+wr.projectid, function (data) {
            		wr.project =  data;
					console.log("async load Project: " + wr.project.id);
            		
            	});
				wr.institution = {};
				$scope.restService.get('http://localhost:8080/timesheets/api/index.php/inst/'+wr.institutionid, function (data) {
            		wr.institution =  data;
					console.log("async load Inst: " + wr.institution.id);
            		
            	});
// 				wr.project = $scope.projectService.get(wr.projectid);
// 				console.log("async load Project: " + wr.project.id);
// 				wr.institution = {};
// 				wr.institution = $scope.institutionService.get(wr.institutionid);
// 				console.log("async load Inst: " + wr.institution.id);
			});
			
    });
// 	console.log($scope.person.name);
// 	$scope.person.workrelations = [];
// 	$scope.person.workrelations = $scope.wrService.getByPers($scope.person.id);
// 	_.each($scope.person.workrelations, function(wr){
// 		wr.project = {};
// 		wr.project = $scope.projectService.get(wr.projectid);
// 		console.log("async load Project: " + wr.project.id);
// 		wr.institution = {};
// 		wr.institution = $scope.institutionService.get(wr.institutionid);
// 		console.log("async load Inst: " + wr.institution.id);
// 	});


}]);




// Person Controller

myTime.controller('ResearcherCtrl', ['$scope', '$routeParams', '$stateParams', '$http', function ($scope, $routeParams, $stateParams, $http) {

	console.log("Load Researcher Controller for Person ID: " + $stateParams.personID);
	

	
	// Get Person
	$scope.person = $scope.personService.get($stateParams.personID);	// Get Person
		console.log("Load person " + $scope.person.name);

	$scope.person.activities = {};
	$scope.person.activities.eu = [];
	$scope.person.activities.noneu = [];
	$scope.person.workrelations = $scope.wrService.getByPers($scope.person.id);	// Get WRs
	
// 	$scope.restService.get('http://localhost:8080/timesheets/api/index.php/person/'+$stateParams.personID+'/wrs', function (data) {
//             $scope.person.workrelations = data;

	
	_.each($scope.person.workrelations, function(wr){
		wr.institution = $scope.institutionService.get(wr.institutionid);	// Get Inst
		console.log("async load Inst: " + wr.institution.id);
		wr.project = $scope.projectService.get(wr.projectid);	// Get Project
		console.log("async load Project: " + wr.project.id);
		wr.project.workpackages = $scope.wpService.getByProj(wr.projectid);	// Get WPs
		_.each(wr.project.workpackages, function(wp){
			wp.activities = $scope.aeuService.getByWP(wp.id);	// Get EU Acts
			_.each(wp.activities, function(a){
				var activity = {};
				activity.id = a.id;
				activity.name = a.name;
				activity.type = a.type;
				activity.othername = a.othername;
				activity.description = a.description;
				activity.institutionid = wr.institution.id;
				activity.institutionname = wr.institution.name;
				activity.projectid = wr.project.id;
				activity.projectname = wr.project.name;
				activity.wpid = wp.id;
				activity.wpnum = wp.number;
				activity.wpname = wp.name;
				a = activity;
					console.log("eua.id: " + a.id);
 				this.eu[this.eu.length] = activity;
			}, this); //EACH EU ACT
		}, this);  //EACH WP
		wr.institution.activities = $scope.iaService.getByInstPers(wr.institution.id, $scope.person.id);	// Get Inst Acts
		_.each(wr.institution.activities, function(a){
			var activity = {};
			activity.id = a.id;
			activity.name = a.name;
			activity.type = a.type;
			activity.othername = a.othername;
			activity.description = a.description;
			activity.institutionid = wr.institution.id;
			activity.institutionname = wr.institution.name;
			a = activity;
				console.log("ia.id: " + a.id);
			this.noneu[this.noneu.length] = activity;
		}, this); // EACH NON EU ACT
			
	}, $scope.person.activities); //EACH WR
	
	            
//     });
	
	$scope.openinst = false;
	$scope.openeu = false;
	$scope.openpers = true;
	
	$scope.toggleInstPanel = function(){
		$scope.openinst = true;
		$scope.openeu = false;
		$scope.openpers = false;
	}
	
	$scope.toggleEUPanel = function(){
		$scope.openeu = true;
		$scope.openinst = false;
		$scope.openpers = false;
	}
	
	$scope.togglePersPanel = function(){
		$scope.openpers = true;
		$scope.openeu = false;
		$scope.openinst = false;
	}

}]);




// Work Relations Controller

myTime.controller('PersonWRCtrl', ['$scope', '$stateParams', '$routeParams', '$http', '$filter', function ($scope, $stateParams, $routeParams, $http, $filter) {

	console.log("Load Person->WR Controller for WR ID: " + $stateParams.wrID + " and person id: " + $stateParams.personID);
	
// 	$scope.isopen = 'false';
// 	$scope.isopen = 'true';

	$scope.person = {};
	$scope.person = {};

	$scope.workrelation = {};
	$scope.workrelation = {};
	$scope.project = {};
	$scope.project = {};
	$scope.institution = {};
	$scope.institution = {};
	$scope.workpackages = [];
	$scope.wpids = [];
	$scope.euactivities = [];
	$scope.instacts = [];
	
	// async load work relation
    $scope.restService.get('data/temp_workrelation.json', function (data) {
            $scope.workrelation = data.filter(function(d){
			    return d.id == $stateParams.wrID;
			})[0];
			console.log("async load work relation id: " + $stateParams.wrID);
    		$scope.workrelation.project = $scope.projectService.get($scope.workrelation.projectid);
    		$scope.workrelation.project.workpackages = [];
    		$scope.workrelation.project.workpackages = $scope.wpService.getByProj($scope.workrelation.projectid);
//     		$scope.workpackages = $scope.wpService.getByProj($scope.workrelation.projectid);
 			$scope.euactivities = $scope.aeuService.list();
			_.each($scope.workrelation.project.workpackages, function(wp){
				wp.euactivities = [];
				wp.euactivities = _.filter(this, function(a){
					return a.wpid == this.id
				}, wp);
			}, $scope.euactivities);
    		$scope.workrelation.institution = $scope.institutionService.get($scope.workrelation.institutionid);
    		$scope.workrelation.person = $scope.personService.get($scope.workrelation.personid);
        }
    );
	
	// async load person
//     $scope.restService.get('data/temp_person.json', function (data) {
//             $scope.person = data.filter(function(d){
// 			    return d.id == $scope.workrelation.personid;
// 			})[0];
// 			console.log("async load person id: " + $scope.workrelation.personid);
//         }
//     );
	
	// async load project
//     $scope.restService.get('data/temp_project.json', function (data) {
//             $scope.project = data.filter(function(d){
// 			    return d.id == $scope.workrelation.projectid;
// 			})[0];
// 			console.log("async load project id: " + $scope.workrelation.projectid);
//         }
//     );
//     $scope.project = $scope.projectService.get($scope.workrelation.projectid);
	
	// async load project WP's
//     $scope.restService.get('data/temp_wp.json', function (data) {
//             $scope.workpackages = data.filter(function(d){
// 			    return d.projectid == $scope.workrelation.projectid;
// 			});
// 			console.log("async load WP's for project id: " + $scope.workrelation.projectid);
// 			$scope.wpids = _.pluck($scope.workpackages, 'id');
//         }
//     );
	
	// async load project activities
//     $scope.restService.get('data/temp_euactivity.json', function (data) {
//             $scope.euactivities = data.filter(function(d){
// 			    return _.contains($scope.wpids, d.wpid);
// 			});
// 			console.log("async load project acts for proj id: " + $scope.workrelation.projectid);
//         }
//     );
	
	// async load institution
//     $scope.restService.get('data/temp_institution.json', function (data) {
//             $scope.institution = data.filter(function(d){
// 			    return d.id == $scope.workrelation.institutionid;
// 			})[0];
// 			console.log("async load institution id: " + $scope.workrelation.institutionid);
//         }
//     );
    
	
	// async load institution activities
    $scope.restService.get('data/temp_instactivity.json', function (data) {
            $scope.instacts = data.filter(function(d){
 			    return d.institutionid == $scope.workrelation.institutionid && d.personid == $scope.workrelation.personid;
			});
			console.log("async load iacts for inst id: " + $scope.workrelation.institutionid);
        }
    );

		
// 	$scope.myResolver = function (defaultResolver, state, isCurrent) {
// 		if (isCurrent) {
// 			return ' WR "' +  $stateParams.wrID + '"';
// 		}
// 		return defaultResolver(state);
// 	}
	
}]);




// Bank Accounts Controller

myTime.controller('BACtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp Bank Accounts data
    $scope.bankaccounts = [];
    $scope.restService.get('data/temp_bankaccount.json', function (data) {
            $scope.bankaccounts = data;
			console.log("async load bankaccounts");
        }
    );

}]);




// Institution Alias Controller

myTime.controller('InstitutionAliasCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {


    // async load temp Institution Aliases data
    $scope.institutionaliases = [];
    $scope.restService.get('data/temp_institutionalias.json', function (data) {
            $scope.institutionaliases = data;
			console.log("async load inst aliases");
        }
    );

}]);




// Work Package Controller

myTime.controller('WPCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {


    // async load temp Work Packages data
    $scope.wps = [];
    $scope.restService.get('data/temp_wp.json', function (data) {
            $scope.wps = data;
			console.log("async load wps");
        }
    );

}]);




// eu activities Controller

myTime.controller('EUActivityCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp eu activities data
    $scope.euactivities = [];
    $scope.restService.get('data/temp_euactivity.json', function (data) {
            $scope.euactivities = data;
			console.log("async load euactivity");
        }
    );

}]);




// Institution Activities Controller

myTime.controller('InstitutionActivityCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp institution activities data
    $scope.institutionactivities = [];
    $scope.restService.get('data/temp_institutionactivity.json', function (data) {
            $scope.institutionactivities = data;
			console.log("async load inst activity");
        }
    );

}]);




// Time Records Controller

myTime.controller('TimeRecordCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp Timerecords data
    $scope.timerecords = [];
    $scope.restService.get('data/temp_timerecord.json', function (data) {
            $scope.timerecords = data;
			console.log("async load timerecords");
        }
    );

}]);




// Clock Controller

myTime.controller('ClockCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp clocks data
    $scope.clocks = [];
    $scope.restService.get('data/temp_clock.json', function (data) {
            $scope.clocks = data;
			console.log("async load clock");
        }
    );

}]);




// My Panel Controller

myTime.controller('MyPanelCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {


    // async load temp projects data
    $scope.projects = [];
    $scope.restService.get('data/temp_project.json', function (data) {
            $scope.projects = data;
			console.log("async load projects");
        }
    );

    // async load temp institutions data
    $scope.institutions = [];
    $scope.restService.get('data/temp_institution.json', function (data) {
            $scope.institutions = data;
        }
    );

    // async load temp Persons data
    $scope.persons = [];
    $scope.restService.get('data/temp_person.json', function (data) {
            $scope.persons = data;
        }
    );

    // async load temp Work Relations data
    $scope.workrelations = [];
    $scope.restService.get('data/temp_workrelation.json', function (data) {
            $scope.workrelations = data;
        }
    );
    // async load temp clocks data
    $scope.clocks = [];
    $scope.restService.get('data/temp_clock.json', function (data) {
            $scope.clocks = data;
			console.log("async load clock");
        }
    );

}]);







