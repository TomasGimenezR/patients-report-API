const http = require('http')
const express = require('express')
require('./db/mongoose')
require('./logging/logging')

const patientRouter = require('./routers/patient')
const appointmentRouter = require('./routers/appointment')
const reportRouter = require('./routers/report')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/patient', patientRouter)
app.use('/api/appointment', appointmentRouter)
app.use('/api/report', reportRouter)

server.listen(port, () => {
    console.log(`Server up in port ${port}`)
})