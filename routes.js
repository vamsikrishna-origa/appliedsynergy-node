var express = require('express');
var api = require('./controller');
var router = express.Router();

router.post('/insert', api.insertProducts);
router.post('/fetchProducts', api.fetch);

module.exports = router;