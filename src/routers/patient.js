const express = require('express')
const Patient = require('../models/patient')
const router = new express.Router()

router.post('/', async (req, res) => {
    let patient = new Patient({
        ...req.body
    })

    try {
        await patient.save()
        console.log('[+] NEW PATIENT CREATED', patient)
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:patientId', async (req, res) => {
    let patient = await Patient.findOne({ code: req.params.patientId })
    if (!patient) {
        console.log('[!!] THE PATIENT COULD NOT BE FOUND, ID:', req.params.patientId)
        res.status(404).send()
    }
    res.status(200).send(patient)
})

router.patch('/:patientId', async (req, res) => {
    let patient = await Patient.findOneAndUpdate({ code: req.params.patientId }, {
        name: req.body.name
    }, { new: true })
    if (!patient) {
        console.log('[!!] THE PATIENT TO UPDATE COULD NOT BE FOUND, ID:', req.body.code)
        res.status(404).send()
    }
    console.log('[+] PATIENT SUCCESSFULLY UPDATED, PATIENT:', patient)
    res.send(patient)
})

router.delete('/:patientId', async (req, res) => {
    try {
        let code = req.params.patientId
        let patient = await Patient.findOneAndDelete({ code })

        if (!patient) {
            console.log('[!!] NO PATIENT FOUND WITH CODE', code)
            res.status(404).send()
        }
        console.log('[-] PATIENT SUCCESSFULLY DELETED, PATIENT:', patient)
        res.send(patient)
    } catch (e) {
        console.log(`[!!] AN ERROR OCCURRED ATTEMPTING TO DELETE PATIENT WITH CODE ${code}:`, e)
        res.status(500).send(e)
    }
})

module.exports = router