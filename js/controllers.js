
myTime.controller('ProjectGridCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

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
    $scope.institutions = [];
    $scope.restService.get('data/temp_institution.json', function (data) {
            $scope.institutions = data;
        }
    );

}]);




// Person Controller

myTime.controller('PersonCtrl', ['$scope', '$routeParams', '$http', 'Utils', function ($scope, $routeParams, $http, Utils) {

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
    
    $scope.selectedInstitution = {};
    $scope.selectedPerson = {};
    $scope.selectedWorkRelation = {};
    
    $scope.listSelectedInstitution = [];
    $scope.listSelectedPerson = [];
    $scope.listSelectedWorkRelation = [];
    
	$scope.$watch('selectedInstitution', function () {
		$scope.restService.get('data/temp_workrelation.json', function (data) {
				$scope.listSelectedWorkRelation = data.filter(function(d){
			        return d.institutionid == $scope.selectedInstitution.id;
			    });
			}
		);
	}, true);

	
}]);




// Work Relations Controller

myTime.controller('WRCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // async load temp Work Relations data
    $scope.workrelations = [];
    $scope.restService.get('data/temp_workrelation.json', function (data) {
            $scope.workrelations = data;
			console.log("async load workrelations");
        }
    );

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







