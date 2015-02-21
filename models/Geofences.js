var mongoose = require('mongoose');

var GeofenceSchema = new mongoose.Schema({
  nickname: String,
  latitude: Number, default: 0,
  longitude: Number, default: 0,
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GeofenceEntry' }],
  exits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GeofenceExit' }]
});

mongoose.model('Geofence', GeofenceSchema);
