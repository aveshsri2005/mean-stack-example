var artistApp = angular.module('artistApp',[
   /* 'ngRoute', */
    "ui.router",
    'commonControllers'
]);

artistApp.config(function($stateProvider,$urlRouterProvider){ 
     $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', {
            url: '/home',
            views: {
                '': { templateUrl: 'views/partial-home.html' },
                'login@home': {
                    templateUrl: 'views/partial-home-login.html'
                  },
                  'register@home': {
                    //template: 'Look I am a column22222222222'
                    templateUrl: 'views/partial-home-register.html'
                  }

            }            
        })
        .state('profile', {
            url: '/profile',
            controller:'ProfileController',
            templateUrl: 'views/profile.html'           
        })
        .state('list', {
            url: '/list',
            controller:'ListController',
            templateUrl: 'views/list.html'           
        })
        .state('details', {
            url:"/details/:itemId",
            controller:'DetailsController',
            templateUrl: 'views/details.html',
            params: {'test': null}           
        });

});


artistApp.directive('passwordVerify', passwordVerify);
function passwordVerify() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;

          // set validity
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
      }
    }
  }