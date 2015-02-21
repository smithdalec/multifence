var mongoose = require('mongoose');

var GeofenceSchema = new mongoose.Schema({
  nickname: String,
  latitude: Number, default: 0,
  longitude: Number, default: 0,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GeofenceEvent' }]
});

mongoose.model('Geofence', GeofenceSchema);
