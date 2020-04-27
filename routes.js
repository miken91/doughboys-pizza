var express = require('express');
var router = express.Router();
var squareServices = require('./square-services');

router.post('/complete-order', function (req, res) {
    squareServices.createOrder(req,res);
})
  
module.exports = router;