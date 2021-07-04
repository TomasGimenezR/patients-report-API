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

router.get('/reportDate', async (req, res) => {
    let report = await Report.findOne({ date: req.params.reportDate })
    if (!patient) {
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

// router.delete('/:patientId', async (req, res) => {
//     try {
//         let code = req.params.patientId
//         let patient = await Patient.findOneAndDelete({ code })

//         if (!patient) {
//             console.log('[!!] NO PATIENT FOUND WITH CODE', code)
//             res.status(404).send()
//         }
//         console.log('[-] PATIENT SUCCESSFULLY DELETED, PATIENT:', patient)
//         res.send(patient)
//     } catch (e) {
//         console.log('[!!] AN ERROR OCCURRED ATTEMPTING TO DELETE PATIENT WITH CODE', code)
//         res.status(500).send()
//     }
// })

module.exports = router