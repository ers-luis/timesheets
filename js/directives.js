'use strict';

directives.directive('fadeIn', function () {
    return {
        compile:function (elm) {
            $(elm).css('opacity', 0.0);
            return function (scope, elm, attrs) {
                $(elm).animate({ opacity:1.0 }, 800);
            };
        }
    };
});

// this is the angular way to stop even propagation
directives.directive('stopEvent', function () {
    return {
        restrict:'A',
        link:function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    }
});


directives.directive('noty', function () {

    return {
        restrict:'A',

        link: function (scope, element, attr) {

            // set notification (noty) defaults on global scope
            var opts = {
                layout: 'bottomRight',
                theme: 'nucleusTheme',
                dismissQueue: true, // If you want to use queue feature set this true
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 250 // opening & closing animation speed
                },
                timeout: 3000, // delay for closing event. Set false for sticky notifications
                force: false, // adds notification to the beginning of queue when set to true
                modal: false,
                maxVisible: 5, // you can set max visible notification for dismissQueue true option
                closeWith: ['click'], // ['click', 'button', 'hover']
                callback: {
                    onShow: function() {},
                    afterShow: function() {},
                    onClose: function() {},
                    afterClose: function() {}
                },
                buttons: false // an array of buttons
            };

            var index = scope.$index;
            var notification = scope.notifications[index];
            var text = notification['text'];
            var type = notification['type'];

            opts.text = text;
            opts.type = type;

            // errors persist on screen longer
            if (type == 'error') {
                opts.timeout = 55000;
            }

            notification['processed'] = true;

            noty(opts);
        }
    }
});


// directives.directive('breadcrumbs', ['$log', '$parse', '$interpolate', function ($log, $parse) {
//             return {
//                 restrict: 'EA',
//                 replace: false,
//                 scope: {
//                     itemDisplayNameResolver: '&'
//                 },
//                 templateUrl: 'tpl/breadcrumbs.html',
//                 controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
// 
//                     var defaultResolver = function (state) {
// 
//                         var displayName = state.data.title || state.name;
// 
//                         return displayName;
//                     };
// 
//                     var isCurrent = function(state){
//                         return $state.$current.name === state.name;
//                     };
// 
//                     var setNavigationState = function () {
//                         $scope.$navigationState = {
//                             currentState: $state.$current,
//                             params: $stateParams,
//                             getDisplayName: function (state) {
// 
//                                 if ($scope.hasCustomResolver) {
//                                     return $scope.itemDisplayNameResolver({
//                                         defaultResolver: defaultResolver,
//                                         state: state,
//                                         isCurrent: isCurrent(state)
//                                     });
//                                 }
//                                 else {
//                                     return defaultResolver(state);
//                                 }
//                             },
//                             isCurrent: function (state) {
// 
//                                 return isCurrent(state);
//                             }
//                         }
//                     };
// 
//                     $scope.$on('$stateChangeSuccess', function () {
//                         setNavigationState();
//                     });
// 
//                     setNavigationState();
//                 }],
//                 link: function (scope, element, attrs, controller) {
//                     scope.hasCustomResolver = angular.isDefined(attrs['itemDisplayNameResolver']);
//                 }
//             };
//         }]);


