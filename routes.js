var express = require('express');
var squareServices = require('./square-services');
var displayServices = require('./display-services')
var router = express.Router();

router.get('/available-times', function (req, res) {
    displayServices.getAvailableTimes(req, res)
})

router.get('/next-event', function(req, res) {
    displayServices.getNextEvent(req, res)
})

router.get('/batch-update-events', function (req, res){
    displayServices.batchUpdateEvents(req, res)
})

router.post('/add-event', function(req, res){
    displayServices.addEvent(req, res)
})

router.get('/get-events', function(req, res){
    displayServices.getEvents(req, res)
})

router.put('/edit-event/:id', function(req, res){
    displayServices.editEvent(req, res)
})

router.post('/complete-order', function (req, res) {
    squareServices.createOrder(req, res);
})

module.exports = router;