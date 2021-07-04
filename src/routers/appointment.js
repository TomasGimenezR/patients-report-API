const express = require('express')
const Appointment = require('../models/appointment')
const router = new express.Router()

router.post('/', async (req, res) => {
    let appointment = new Appointment({
        ...req.body
    })

    try {
        await appointment.save()
        console.log('[+] NEW APPOINTMENT CREATED', appointment)
        res.status(201).send(appointment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:appointmentId', async (req, res) => {
    let appointment = await Appointment.findById(req.params.appointmentId)
    if (!appointment) {
        console.log('[!!] THE APPOINTMENT COULD NOT BE FOUND, ID:', req.params.appointmentId)
        res.status(404).send()
    }
    res.status(200).send(appointment)
})

router.put('/:appointmentId', async (req, res) => {
    let appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, {
        ...req.body
    }, { new: true })
    if (!appointment) {
        console.log('[!!] THE APPOINTMENT TO UPDATE COULD NOT BE FOUND, ID:', req.body.code)
        res.status(404).send()
    }
    console.log('[+] APPOINTMENT SUCCESSFULLY UPDATED, APPOINTMENT:', appointment)
    res.send(appointment)
})

router.delete('/:appointmentId', async (req, res) => {
    try {
        let code = req.params.appointmentId
        let appointment = await Appointment.findByIdAndDelete(code)
        if (!appointment) {
            console.log('[!!] NO APPOINTMENT FOUND WITH CODE', code)
            res.status(404).send()
        }
        console.log('[-] APPOINTMENT SUCCESSFULLY DELETED, PATIENT:', appointment)
        res.send(appointment)
    } catch (e) {
        console.log('[!!] AN ERROR OCCURRED ATTEMPTING TO DELETE APPOINTMENT WITH CODE', code)
        res.status(500).send()
    }
})


module.exports = router