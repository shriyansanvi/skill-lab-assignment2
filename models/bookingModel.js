const mongoose = require('mongoose');

// Create the Booking schema
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'], // Validation
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'], // Validation
    trim: true,
    lowercase: true,
  },
  event: {
    type: String,
    required: [true, 'Event is required.'], // Validation
    trim: true,
  },
  ticketType: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
module.exports = mongoose.model('Booking', bookingSchema);