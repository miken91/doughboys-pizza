const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let EventSchema = new Schema({
    description: {type: String},
    startTime: {type: Date},
    endTime: {type: Date},
    endServiceTime: {type: Date},
    ordersPerFiveMinutes: {type: Number},
    availableTimes: [{time: String, count: String}],
    date: {type: String}
})

module.exports = mongoose.model('Event', EventSchema)