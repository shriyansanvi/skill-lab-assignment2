const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'], 
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'], 
    trim: true,
    lowercase: true,
  },
  event: {
    type: String,
    required: [true, 'Event is required.'], 
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


module.exports = mongoose.model('Booking', bookingSchema);