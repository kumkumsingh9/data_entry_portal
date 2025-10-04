const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formName: {
    type: String,
    required: true,
    trim: true
  },
  formVersion: {
    type: String,
    default: '1.0'
  },
  responses: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  currentStep: {
    type: Number,
    default: 1
  },
  totalSteps: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: null
  },
  lastSaved: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
formDataSchema.index({ userId: 1, formName: 1 });
formDataSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('FormData', formDataSchema);
