var commonControllers = angular.module('commonControllers', ['ngAnimate']);

//registration controller
commonControllers.controller('RegistrationController', ['$scope', '$http', function($scope, $http) {  
   $scope.message = "";
   $scope.myPwdInvalid = "";
   $scope.register = function(data) {
       if ($scope.registrationForm.$valid) {
         var postdata = JSON.stringify($scope.user);           
          $http.post("api/signup",postdata).success(function(response){
              console.log(response);
              if(response.success){
                  $scope.message = "You have been registered successfully.";
                  $scope.user    = {};
              } 

          }).error(function(error){
              console.log(error);
          });
       }      
   }
}]);


//login controller
commonControllers.controller('LoginController', ['$scope', '$http','$state', function($scope, $http, $state) {
   $scope.login = function(data){
     // $scope.submitted = true;   
     $scope.message = "";
     if ($scope.loginForm.$valid) {
         var postdata = JSON.stringify($scope.user);           
          $http.post("api/login",postdata).success(function(response){
              console.log(response);
              if(response){
                  localStorage.setItem("token", JSON.stringify(response));
                  $state.go("profile");
              } 
          }).error(function(error){
              console.log(error);
          });
       }   
    }
}]);


//list controller
commonControllers.controller('ListController', ['$scope', '$http' ,'AuthenticationService', function($scope, $http, AuthenticationService) {
 //check login status
 AuthenticationService.checkToken();

$http.get('/api/artists').success(function(data) {
    $scope.artists = data;
    $scope.artistOrder = 'name';
    $scope.limit = "9";  
  });
 $scope.searchArtists  = function(query){
      if(query!=null){
        return function(artist){
                 var nameMatch    =  artist.name.toLowerCase().search(query.toLowerCase()) !== -1;
                 var reknownMatch =  artist.reknown.toLowerCase().search(query.toLowerCase())!== -1;
                return nameMatch || reknownMatch;
            }
       }};


 $scope.logout = function(){
    AuthenticationService.logout();  
 }

}]);

//details controller
commonControllers.controller('DetailsController', ['$scope', '$http','$stateParams', function($scope, $http, $stateParams) {
  $http.get('/api/artists').success(function(data) {
    $scope.artists = data;
    $scope.whichItem = $stateParams.itemId;

    if($stateParams.itemId>0){
       $scope.prevItem = Number($stateParams.itemId)-1;
    }else{
        $scope.prevItem = $scope.artists.length-1;
    }

    if($stateParams.itemId<$scope.artists.length-1){
       $scope.nextItem = Number($stateParams.itemId)+1;
    }else{
        $scope.nextItem = 0;
    }

  });
}]);