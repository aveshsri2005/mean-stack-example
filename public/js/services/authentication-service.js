artistApp.service('AuthenticationService', ["$http", "$state", function($http, $state){
	var self = this;
	self.checkToken = function(){
		  var token;
		  if (!localStorage['token']){
		  	    $state.go("home");
		  } else {
			    token = JSON.parse(localStorage['token']);
	            $http.post("api/validate", token).success(function(response){
				if (response === "unauthorized"){
					console.log("Logged out");
					$state.go("home")
				} else {
					console.log("Logged In");
					return response;
				}
				}).error(function(error){
					$state.go("home")
				});
		  }		  
	}

    self.logout = function(){
		  var token;
		  if (!localStorage['token']){
		  	    $state.go("home");
		  } else {
			    token = JSON.parse(localStorage['token']);
	            $http.post('api/logout', token).success(function(response){
			      console.log(response)
			      localStorage.clear();
			      $state.go("home");
			    }).error(function(error){
			      console.error(error);
			    });
		  }		  
	}

}]);