var mongoose = require('mongoose');

var GeofenceEventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  message: String,
  geofence: { type: mongoose.Schema.Types.ObjectId, ref: 'Geofence' }
});

mongoose.model('GeofenceEvent', GeofenceEventSchema);
