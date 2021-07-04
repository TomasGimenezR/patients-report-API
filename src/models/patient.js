const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient