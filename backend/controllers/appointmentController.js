const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.getAppointments = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    const { page = 1, limit = 10, search = "", status } = req.query;
    
    const query = {};
    const skip = (page - 1) * limit;

    // Role-based filtering
    if (role === "patient") {
      query.patientId = userId;
    } else if (role === "therapist") {
      query.therapistId = userId;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    // Status filtering
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("patientId", "name email")
      .populate("therapistId", "name email");

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: appointments,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch appointments",
      error: error.message 
    });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    const appointmentData = req.body;

    // Patients can only create appointments for themselves
    if (role === "patient") {
      appointmentData.patientId = userId;
      appointmentData.status = "pending";
    }

    // Admins can create appointments with any status
    const appointment = new Appointment(appointmentData);
    await appointment.save();

    res.status(201).json({
      success: true,
      data: appointment,
      message: "Appointment created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    // Role-based update restrictions
    if (role === "therapist") {
      // Therapists can only update certain fields
      const allowedUpdates = ["appointmentDate", "notes", "status"];
      Object.keys(updateData).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          delete updateData[key];
        }
      });
      
      // Therapists can only update their own appointments
      if (appointment.therapistId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this appointment"
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("patientId therapistId", "name email");

    res.json({
      success: true,
      data: updatedAppointment,
      message: "Appointment updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "declined", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("patientId therapistId", "name email");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.json({
      success: true,
      data: appointment,
      message: "Appointment status updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update appointment status",
      error: error.message
    });
  }
};

exports.assignTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    const { therapistId } = req.body;

    // Verify therapist exists
    const therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== "therapist") {
      return res.status(400).json({
        success: false,
        message: "Invalid therapist ID"
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { therapistId },
      { new: true }
    ).populate("patientId therapistId", "name email");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.json({
      success: true,
      data: appointment,
      message: "Therapist assigned successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to assign therapist",
      error: error.message
    });
  }
};