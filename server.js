require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const Booking = require('./models/bookingModel');

const app = express();
app.use(express.json()); 


app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/api/bookings/search', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required.' });
    }
    const bookings = await Booking.find({ email: email });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found with that email.' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/bookings/filter', async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) {
      return res.status(400).json({ message: 'Event query parameter is required.' });
    }
    const bookings = await Booking.find({ event: event });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for that event.' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json({ message: 'Booking cancelled successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(4000, () => {
      console.log(`Server running at http://localhost:4000/`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });