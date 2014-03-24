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
