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
                        console.log("failed to retrieve data");
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



myTime.factory('Utils', ['$rootScope', function ($rootScope) {
  return {
   
      
      id: function(item) {
        return item.id;
      },
      personid: function(item) {
        return item.personid;
      },
      institutionid: function(item) {
        return item.institutionid;
      },
      name: function(item) {
        return item.name;
      },
      projects: [],
      institutions: [],
      institutionaliases: [],
      persons: [],
      workrelations: [],
      bankaccounts: [],
      
//       nondeleted : function(item) {
//         return !item.deleted();
//       },
//       beeldcontent: function(item) {
//         return item.data('beeldcontent');
//       },
//       user: "",
//       incident: "",
//       onlineUsers: function (users,peers) {
//         var onlineUsers = [];
//         var activeUsers = _(cow.users()).filter(function(d){return !d.deleted();});
//         var onlinePeers = _(cow.peers()).filter(function(d){return !d.deleted();});
//         var peersByUser = _.groupBy(onlinePeers, function(d){ return d.data('userid');});
//         _.each(activeUsers, function(d){
//             var user = {};
//             user.name = d.id();
//             user.timestamp = 0;
//             var peers = peersByUser[d.id()];
//             user.online = false;
//             user.inProject = false;
//             if (peers){
//                 user.online = true;
//                 var peersProjects = _.map(peers,function(d){return d.data('activeproject');});
//                 if (cow.project()){
//                     user.inProject = _.contains(peersProjects,cow.project().id());
//                 }
//             }
//             onlineUsers.push(user);
//             //console.log(d.id(),user);
//         });
//         return onlineUsers;
//       },            
//       project: {},
//       projectlist: [],
//       itemlist: [],
//       userlist: [],
//       peerlist: [],
      users: []// ,
//       beeldcontentDiff: function(item) {
//         if(!item) {
//             return '';
//         }
//         var deltas = item.deltas();
//         var oldValue = '';
//         for (var i =  deltas.length - 2; i >= 0; i--)
//         {
//           if (deltas[i].data.beeldcontent !== undefined)
//           {
//             oldValue = deltas[i].data.beeldcontent;
//             break;
//           }
//         }
//         return TextDifference(oldValue, item.data('beeldcontent'));
//       }
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



