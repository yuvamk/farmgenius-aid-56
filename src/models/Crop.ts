
import mongoose from 'mongoose';

const CropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a crop name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  status: {
    type: String,
    required: [true, 'Please provide a status'],
    enum: ['healthy', 'attention needed', 'critical'],
    default: 'healthy',
  },
  plantedDate: {
    type: Date,
    required: [true, 'Please provide a planting date'],
  },
  expectedHarvest: {
    type: Date,
    required: [true, 'Please provide an expected harvest date'],
  },
  healthHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    condition: String,
    notes: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Crop || mongoose.model('Crop', CropSchema);
