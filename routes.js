var express = require('express');
var squareServices = require('./square-services');


  
module.exports = function() {
    let router = express.Router();

    router.post('/complete-order', function (req, res) {
        squareServices.createOrder(req,res);
    })

    router.get('/available-times', function(req, res) {
        
    })
};