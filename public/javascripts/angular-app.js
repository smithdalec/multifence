
var app = angular.module('multifence', ['ui.router'])

// Add some ui-router configurations
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html",
      controller: "MainCtrl"
    })
    .state('geofence', {
      url: "/geofence/{id}",
      templateUrl: "geofence.html",
      controller: "GeofenceCtrl"
    });
});

// Create some dummy data (for now) in a service
app.factory('geofences', [function(){
  var o = {
    geofences: [
      {latitude: 27.8465315, longitude: -82.6360484},
      {latitude: 27.7909140, longitude: -82.6382120, events:
        [
          {date: '2014-02-16 12:00', message: 'Exited geofence'},
          {date: '2014-02-16 16:00', message: 'Entered geofence'},
          {date: '2014-02-16 18:00', message: 'Exited geofence'},
          {date: '2014-02-16 19:00', message: 'Entered geofence'}
        ]
      }
    ]
  };
  return o;
}]);

// /home router controller
app.controller('MainCtrl', function($scope, geofences){  
  $scope.geofences = geofences.geofences;
  
  $scope.addGeofence = function(){
    // If lat/long are actually numbers, submit them to our list of geofences
    if (!isNaN($scope.latitude) && !isNaN($scope.longitude)) {
      $scope.geofences.push({
        latitude: $scope.latitude, 
        longitude: $scope.longitude,
        events: [
        ]
      });
    }
  };
  
});

// /geofence/{id} router controller
app.controller('GeofenceCtrl', function($scope, $stateParams, geofences){
  $scope.geofence = geofences.geofences[$stateParams.id];
});
