var mongoose = require('mongoose');

var GeofenceExitSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  geofence: { type: mongoose.Schema.Types.ObjectId, ref: 'Geofence' }
});

mongoose.model('GeofenceExit', GeofenceExitSchema);
