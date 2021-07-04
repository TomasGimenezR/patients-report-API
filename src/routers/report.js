const express = require('express')
const Report = require('../models/report')
const router = new express.Router()

router.post('/', async (req, res) => {
    let date = new Date()
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let report = new Report({
        date: `${date.getFullYear()}-${month}`
    })

    try {
        await report.save()
        console.log('[+] NEW REPORT CREATED', report)
        res.status(201).send(report)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:reportDate', async (req, res) => {
    let report = await Report.findOne({ date: req.params.reportDate })
    if (!report) {
        console.log('[!!] THE REPORT COULD NOT BE FOUND, DATE:', req.params.reportDate)
        res.status(404).send()
    }
    res.status(200).send(report)
})

// router.patch('/:patientId', async (req, res) => {
//     let patient = await Patient.findOneAndUpdate({ code: req.params.patientId }, {
//         name: req.body.name
//     }, { new: true })
//     if (!patient) {
//         console.log('[!!] THE PATIENT TO UPDATE COULD NOT BE FOUND, ID:', req.body.code)
//         res.status(404).send()
//     }
//     console.log('[+] PATIENT SUCCESSFULLY UPDATED, PATIENT:', patient)
//     res.send(patient)
// })

router.delete('/:reportDate', async (req, res) => {
    try {
        let date = req.params.reportDate
        let report = await Report.findOneAndDelete({ date })

        if (!report) {
            console.log('[!!] NO REPORT FOUND WITH DATE', date)
            res.status(404).send()
        } else {
            console.log('[-] REPORT SUCCESSFULLY DELETED, REPORT:', report)
            res.send(report)
        }
    } catch (e) {
        console.log(`[!!] AN ERROR OCCURRED ATTEMPTING TO DELETE REPORT WITH DATE ${date}:`, e)
        res.status(500).send(e)
    }
})

module.exports = router