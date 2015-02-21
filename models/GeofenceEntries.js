var mongoose = require('mongoose');

var GeofenceEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  geofence: { type: mongoose.Schema.Types.ObjectId, ref: 'Geofence' }
});

mongoose.model('GeofenceEntry', GeofenceEntrySchema);
