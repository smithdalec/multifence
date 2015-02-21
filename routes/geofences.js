var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Geofence = mongoose.model('Geofence');

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
  
  Geofence.find(function(err, geofences){
    if(err){ return next(err); }
    res.json(geofences);
  });
  
});


/**
 * GET /api/geofence/{geofence}
 * Get data for a single geofence
 */
router.get('/:geofence', function(req, res, next) {
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
  
  res.json(req.geofence);
});


/**
 * POST api/geofences
 * Insert a geofence
 */
router.post('/', function(req, res, next) {
  var geofence = new Geofence(req.body);

  geofence.save(function(err, geofence){
    if(err){ return next(err); }

    res.json(geofence);
  });
  
});


/**
 * When the :geofence argument exists in a router definition, load the geofence
 */
router.param('geofence', function(req, res, next, id) {
  var query = Geofence.findById(id);

  query.exec(function (err, geofence){
    if (err) { return next(err); }
    if (!geofence) { return next(new Error('can\'t find geofence')); }

    req.geofence = geofence;
    return next();
  });
});

module.exports = router;
