var express = require('express');
var squareServices = require('./square-services');
var eventServices = require('./event-services')
var router = express.Router();

router.get('/next-event', function(req, res) {
    eventServices.getNextEvent(req, res)
})

router.get('/batch-update-events', function (req, res){
    eventServices.batchUpdateEvents(req, res)
})

router.get('/get-events-for-the-day', function(req, res){
    eventServices.getEventsForTheDay(req, res)
})

router.post('/add-event', function(req, res){
    eventServices.addEvent(req, res)
})

router.delete('/delete-event/:id', function(req, res){
    eventServices.deleteEvent(req, res)
})

router.get('/get-events', function(req, res){
    eventServices.getEvents(req, res)
})

router.put('/edit-event/:id', function(req, res){
    eventServices.editEvent(req, res)
})

router.post('/complete-order', function (req, res) {
    squareServices.createOrder(req, res);
})

module.exports = router;