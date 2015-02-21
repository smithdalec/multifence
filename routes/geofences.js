var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Geofence = mongoose.model('Geofence');
var GeofenceEntry = mongoose.model('GeofenceEntry');

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
  req.geofence.populate('entries', function(err, geofence) {
    if(err){ return next(err); }
    res.json(req.geofence);
  });
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

router.put('/:geofence/enter', function(req, res, next) {
  var entry = new GeofenceEntry();
  
  entry.geofence = req.geofence;
  
  entry.save(function(err, entry) {
    if (err) { return next(err); }
    
    req.geofence.entries.push(entry);
    req.geofence.save(function(err, geofence) {
      if (err) { return next(err); }
      res.json(entry);
    });
  })
})


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
