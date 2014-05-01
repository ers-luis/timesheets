'use strict';

// simple stub that could use a lot of work...
myTime.factory('RESTService',
    function ($http) {
        return {
            get:function (url, callback) {
                return $http({method:'GET', url:url}).
                    success(function (data, status, headers, config) {
                        callback(data);
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data " + url);
                    });
            }
        };
    }
);



// simple auth service that can use a lot of work... 
myTime.factory('AuthService',
    function () {
    
        var currentUser = null;
        
        // this tells us we are in public browsing
        var authorized = false;

        // initial state says we haven't logged in or out yet... Maybe it wasn't meant to work for mpm?
        var initialState = true;

        return {
            initialState:function () {
                return initialState;
            },
            login:function (name, password) {
                currentUser = name;
                authorized = true;
                //console.log("Logged in as " + name);
                initialState = false;
            },
            logout:function () {
                currentUser = null;
                authorized = false;
            },
            isLoggedIn:function () {
                return authorized;
            },
            currentUser:function () {
                return currentUser;
            },
            authorized:function () {
                return authorized;
            }
        };
    }
);

myTime.service('InstitutionService', ['$http', function($http) {
	var institutions = [];
	var promise = $http({method:'GET', url:'data/temp_institution.json'}).
                    success(function (data, status, headers, config) {
                        institutions = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(institution) {
	
	}
	
	this.get = function(id) {
		return _.find(institutions, function(p){ return p.id == id; });
	}
	
	this.delete = function(id) {
	
	}
	
	this.list = function() {
		return institutions;
	}

}]);

myTime.service('ProjectService', ['$http', function($http) {
	var projects = [];
// 	var promise = $http({method:'GET', url:'data/temp_project.json'}).
	var promise = $http({method:'GET', url:'http://localhost:8080/timesheets/api/index.php/project'}).
                    success(function (data, status, headers, config) {
                        projects = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(project) {
	
	}
	
	this.get = function(id) {
		return _.find(projects, function(p){ return p.id == id; });
	}
	
	this.delete = function(id) {
	
	}
	
	this.list = function() {
		return projects;
	}

}]);

myTime.service('InstitutionActivityService', ['$http', function($http) {
	var ias = [];
	var promise = $http({method:'GET', url:'data/temp_instactivity.json'}).
                    success(function (data, status, headers, config) {
                        ias = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(ia) {
	
	}
	
	this.get = function(id) {
		return _.find(ias, function(d){ return d.id == id; });
	}
	
	this.getByInstPers = function(id1, id2) {
		return _.filter(ias, function(d){ 
			return d.institutionid == id1 && d.personid == id2; 
		});
	}
	
	this.delete = function(id) {
	
	}
	
	this.list = function() {
		return ias;
	}

}]);

myTime.service('WorkRelationService', ['$http', function($http) {
	var wrs = [];
// 	var promise = $http({method:'GET', url:'data/temp_workrelation.json'}).
	var promise = $http({method:'GET', url:'http://localhost:8080/timesheets/api/index.php/wrs'}).
                    success(function (data, status, headers, config) {
                        wrs = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(wr) {
	
	}
	
	this.get = function(id) {
		return _.find(wrs, function(p){ return p.id == id; });
	}
	
	this.getByPers = function(id) {
		return _.filter(wrs, function(d){ 
			return d.personid == id; 
		});
	}
	
	this.delete = function(id) {
	
	}
	
	this.list = function() {
		return wrs;
	}

}]);

myTime.service('PersonService', ['$http', function($http) {
	var persons = [];
	var person = {};
// 	var promise = $http({method:'GET', url:'data/temp_person.json'}).
	var promise = $http({method:'GET', url:'http://localhost:8080/timesheets/api/index.php/person'}).
                    success(function (data, status, headers, config) {
                        persons = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(person) {
	
	}
	
	this.get = function(id) {
		return _.find(persons, function(d){ return d.id == id; });
	}
	
	this.delete = function(id) {
		// DELETE
	}
	
	this.list = function() {
		return persons;
	}

}]);

myTime.service('WorkPackageService', ['$http', function($http) {
	var wps = [];
	var promise = $http({method:'GET', url:'data/temp_wp.json'}).
                    success(function (data, status, headers, config) {
                        wps = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(wp) {
	
	}
	
	this.get = function(id) {
		return _.find(wps, function(d){ return d.id == id; });
	}
	
	this.getByProj = function(id) {
		return _.filter(wps, function(d){ return d.projectid == id; });
	}
	
	this.delete = function(id) {
		// DELETE
	}
	
	this.list = function() {
		return wps;
	}

}]);

myTime.service('ActivityEUService', ['$http', function($http) {
	var aeus = [];
	var promise = $http({method:'GET', url:'data/temp_euactivity.json'}).
                    success(function (data, status, headers, config) {
                        aeus = data;
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
	
	this.promise = promise;
	
	this.save = function(aeu) {
		//Save
	}
	
	this.get = function(id) {
		return _.find(aeus, function(d){ return d.id == id; });
	}
	
	this.getByWP = function(id) {
		return _.filter(aeus, function(d){ return d.wpid == id; });
	}
	
	this.delete = function(id) {
		// DELETE
	}
	
	this.list = function() {
		return aeus;
	}

}]);


// 		UTILS
myTime.factory('Utils', ['$rootScope', '$http', function ($rootScope, $http) {
	
	var Utils = {};
	Utils.projects = [];
	Utils.persons = [];
	Utils.workrelations = [];
	Utils.institutions = [];
	Utils.getData = function(q) {
		$http({method:'GET', url:'data/temp_project.json'}).
			success(function (data, status, headers, config) {
				Utils.projects = data;
				//console.log(data.json);
				q.resolve();
			}).
			error(function (data, status, headers, config) {
				console.log("failed to retrieve data");
			});
		$http({method:'GET', url:'data/temp_person.json'}).
			success(function (data, status, headers, config) {
				Utils.persons = data;
				//console.log(data.json);
				q.resolve();
			}).
			error(function (data, status, headers, config) {
				console.log("failed to retrieve data");
			});
		$http({method:'GET', url:'data/temp_workrelation.json'}).
			success(function (data, status, headers, config) {
				Utils.workrelations = data;
				//console.log(data.json);
				q.resolve();
			}).
			error(function (data, status, headers, config) {
				console.log("failed to retrieve data");
			});
		$http({method:'GET', url:'data/temp_institution.json'}).
			success(function (data, status, headers, config) {
				Utils.institutions = data;
				//console.log(data.json);
				q.resolve();
			}).
			error(function (data, status, headers, config) {
				console.log("failed to retrieve data");
			});
	
	}
	
  return {
  	setData: function() {
  		getData();
  	},
  	instData: function() {
  		return Utils.institutions;
  	}
  
  };
   

}]);




// simple stub that could use a lot of work...
// myTime.factory('GridService',
//     function ($scope, $http) {
//     	
// 
// 		$scope.filterOptions = {
// 			filterText: "",
// 			useExternalFilter: true
// 		};
// 
// 		$scope.pagingOptions = {
// 			pageSizes: [10, 25, 100],
// 			pageSize: 10,
// 			totalServerItems: 15,
// 			currentPage: 1
// 		};
// 
// 		$scope.getPagedDataAsync = function (pageSize, page, searchText) {
// 			setTimeout(
// 
// 				function () {
// 					var data;
// 					if (searchText) {
// 						var ft = searchText.toLowerCase();
// 						$http.get(dataUrl)
// 							.success(
// 
// 							function (servicesJson) {
// 								data = servicesJson.filter(function (item) {
// 									return JSON.stringify(
// 											item)
// 										.toLowerCase()
// 										.indexOf(
// 											ft) != -1;
// 								});
// 								$scope.setPagingData(
// 									data,
// 									page,
// 									pageSize);
// 							});
// 					} else {
// 						$http.get(dataUrl).success(
// 
// 							function (servicesJson) {
// 								// window.alert(servicesJson);
// 								$scope.setPagingData(
// 									servicesJson, page,
// 									pageSize);
// 							});
// 					}
// 				}, 100);
// 		};
// 
// 		$scope.setPagingData = function (data, page, pageSize) {
// 			var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
// 			$scope.servicesData = pagedData;
// 			$scope.pagingOptions.totalServerItems = data.length;
// 			if (!$scope.$$phase) {
// 				$scope.$apply();
// 			}
// 		};
// 
// 		$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
// 			$scope.pagingOptions.currentPage);
// 
// 		$scope.$watch('pagingOptions', function () {
// 			$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
// 				$scope.pagingOptions.currentPage,
// 				$scope.filterOptions.filterText);
// 		}, true);
// 		$scope.$watch('filterOptions', function () {
// 			$scope.getPagedDataAsync($scope.pagingOptions.pageSize,
// 				$scope.pagingOptions.currentPage,
// 				$scope.filterOptions.filterText);
// 		}, true);
// 
// 		$scope.mySelections = [];
// 
// 		$scope.serviceName = "";
// 		$scope.url = "";
// 
// 		$scope.gridOptions = {
// 			canSelectRows: false,
// 			enableCellEdit: true,
// 			multiSelect: false,
// // 			jqueryUITheme: true,
// 			displaySelectionCheckbox: false,
// 			data: 'servicesData',
// 			selectedItems: $scope.mySelections,
// 			enablePaging: true,
// 			pagingOptions: $scope.pagingOptions,
// 			filterOptions: $scope.filterOptions
// 		};
//     	
//         return {
//             createDataGrid:function (url, callback) {
//                 return $http({method:'GET', url:url}).
//                     success(function (data, status, headers, config) {
//                         callback(data);
//                         //console.log(data.json);
//                     }).
//                     error(function (data, status, headers, config) {
//                         console.log("failed to retrieve data");
//                     });
//             }
//         };
//     }
// );



