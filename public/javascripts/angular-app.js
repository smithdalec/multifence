
// Initialize the multifence module, and add ui.router as a dependency (required
// for all the state machine/routing goodies)
var app = angular.module('multifence', ['ui.router', 'ngResource'])


// Add some ui-router configurations
// We're passing in a map of service names that correlate to arguments for DI
// (just like in the controllers)
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  
  // Define our routes, and assign templates/controllers
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html",
      controller: "MainCtrl"
    })
    .state('geofences', {
      url: "/geofences/{id}",
      templateUrl: "geofence.html",
      controller: "GeofenceCtrl"
    });
    
  // Fallback if no other routes match
  $urlRouterProvider.otherwise("/home");
}]);


// Set up a service for getting a list of geofences
app.factory('Geofences', [
'$resource',
function($resource) {
  return $resource('/api/geofences/:id')
}]);


// /home router controller
// $scope is provided by angular and contains variables that we send to the view
// geofences is defined by our factory method
app.controller('MainCtrl', [
'$scope', 
'Geofences', 
function($scope, Geofences) {
  
  Geofences.query(function(data) {
    // Send the geofences data to the view
    $scope.geofences = data;
  });
  
  // Callback fired when the add geofence form is submitted
  $scope.addGeofence = function(){
    // If lat/long are actually numbers, submit them to our list of geofences
    if (!isNaN($scope.latitude) && !isNaN($scope.longitude)) {
      var geofence = {
        nickname: $scope.nickname,
        latitude: $scope.latitude, 
        longitude: $scope.longitude
      };
      
      // Add the geofence to the view
      $scope.geofences.push(geofence);
      // Send a POST to save the geofence in the db
      Geofences.save(geofence);
    }
    else {
      // TODO something more user-friendly
      alert('Invalid latitude/longitude')
    }
  };
  
}]);


// /geofence/{id} router controller
app.controller('GeofenceCtrl', [
'$scope',
'$stateParams',
'Geofences',
function($scope, $stateParams, Geofences) {
  Geofences.get({ id: $stateParams.id }, function(data) {
    $scope.geofence = data;
  });
}]);
