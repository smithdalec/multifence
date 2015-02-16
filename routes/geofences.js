var express = require('express');
var router = express.Router();

/* GET geofences listing. */
router.get('/', function(req, res, next) {
  // Some dummy data
  var geofences = [
    {latitude: 27.8465315, longitude: -82.6360484},
    {latitude: 27.7909140, longitude: -82.6382120}
  ]
  res.json(geofences);
});

module.exports = router;
