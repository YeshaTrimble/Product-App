//Define an angular module for our app
var sampleApp = angular.module('prodApp', ['ngRoute']);


  sampleApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/Edit', {
                    templateUrl: 'Edit.html',
                    controller: 'EditController'
                }).
                when('/New', {
                    templateUrl: 'New.html',
                    controller: 'NewController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);

   sampleApp.controller('EditController', ['$scope', '$http', function($scope,$http){
           
        var refresh = function (){
          $http.get('/prodlist').success(function(response){
              console.log("I got data ");  
             $scope.prodlist = response;
            });
          };
         refresh();

       $scope.edit = function(id){
       console.log(id);
       $http.get('/prodlist/' + id).success(function(response){
           $scope.prodlist = response;         
          });
      
      
      };
         $scope.update = function(){
     console.log($scope.prodlist._id +"CP" +  $scope.prodlist.cp);
       
      if($scope.prodlist.sp < $scope.prodlist.cp) {
           alert("SP cannot be less than cp");
         }
         else{
      
         $http.put('/prodlist/' + $scope.prodlist._id,
         $scope.prodlist).success(function(response){
       
          });
        }
        
     };

                          
      }]);


    sampleApp.controller('NewController', ['$scope', '$http', function($scope,$http){
           
        
    $scope.add = function(){
              console.log("newdata" + $scope.prod.prod_id);  
             $http.post('/prodlist', $scope.prod).success(function(response){
             console.log(response); 
             
             });      
  
          };
                       
      }]);