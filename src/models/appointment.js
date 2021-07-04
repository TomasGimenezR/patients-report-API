const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment