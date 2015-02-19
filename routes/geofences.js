var express = require('express');
var router = express.Router();


/**
 * GET /api/geofence
 * Get a list of geofences
 */
router.get('/', function(req, res, next) {
  // Some dummy data
  var geofences = [
    {latitude: 27.8465315, longitude: -82.6360484},
    {latitude: 27.7909140, longitude: -82.6382120}
  ]
  res.json(geofences);
});


/**
 * GET /api/geofence/{id}
 * Get data for a single geofence
 */
router.get('/:id', function(req, res, next) {
  // Some dummy data
  var geofence = {
    latitude: 27.8465315, 
    longitude: -82.6360484,
    events: [
      {date: '2014-02-18 08:29:00', message: 'Left geofence'},
      {date: '2014-02-18 17:35:00', message: 'Entered geofence'},
      {date: '2014-02-18 21:15:00', message: 'Left geofence'},
      {date: '2014-02-18 23:02:00', message: 'Entered geofence'},
    ],
    users: [1, 2]
  }
  
  res.json(geofence);
});


/**
 * POST api/geofences
 * Insert a geofence
 */
router.post('/', function(req, res, next) {
  // TODO save the data
  res.send(200);
});

module.exports = router;
