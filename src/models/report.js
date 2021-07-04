const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    appointments: [{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    }]
})

reportSchema.methods.addAppointment = function (appointment) {
    const report = this
    report.appointments.push(appointment._id)
}

const Report = mongoose.model('Report', reportSchema)

module.exports = Report