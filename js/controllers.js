
myTime.controller('ProjectCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

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

myTime.controller('PersonCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

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

	
}]);







