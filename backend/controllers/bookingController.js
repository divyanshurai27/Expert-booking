const Booking = require("../models/bookings");

// POST /api/bookings
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);

    // Real-time emit
    req.io.emit("slotBooked", {
      expertId: booking.expert,
      date: booking.date,
      timeSlot: booking.timeSlot
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked"
      });
    }
    next(error);
  }
};

// GET /api/bookings?email=
exports.getBookingsByEmail = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ email: req.query.email })
      .populate("expert");

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    next(error);
  }
};