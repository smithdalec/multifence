var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Geofence = mongoose.model('Geofence');
var GeofenceEntry = mongoose.model('GeofenceEntry');

/**
 * GET /api/geofences
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
 * GET /api/geofence/{geofence}
 * Get data for a single geofence
 */
router.get('/:geofence', function(req, res, next) {
  req.geofence.populate('entries', function(err, geofence) {
    if(err){ return next(err); }
    
    req.geofence.populate('exits', function(err, geofence) {
      if(err){ return next(err); }
      res.json(req.geofence);
    });
  });
});


/**
 * PUT api/geofences/{geofence}/enter
 * Add an enter event to a geofence
 */
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
  });
});


/**
 * PUT api/geofences/{geofence}/exit
 * Add an exit event to a geofence
 */
router.put('/:geofence/exit', function(req, res, next) {
  var exit = new GeofenceEntry();
  
  exit.geofence = req.geofence;
  
  // TODO later: find out why the "exit" collection in mongo isn't being persisted.
  console.log(exit);
  exit.save(function(err, exit) {
    if (err) { return next(err); }
    console.log(exit);
    
    req.geofence.exits.push(exit);
    req.geofence.save(function(err, geofence) {
      if (err) { return next(err); }
      res.json(exit);
    });
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
