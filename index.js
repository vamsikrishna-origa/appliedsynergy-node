var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var routes = require('./routes');
var app = express();
var port = 8000;
var uri = require('./config').mongouri;
app.use(cors());
app.use(bodyParser.json());

app.use(routes);

mongoose.connect(uri).then(() => {
    console.log('Successfully connected to the database');
}).catch((err) => {
    console.log('Error while connecting db', err);
})

app.listen(port, function(err){
    if(err) {
        console.log('Error while connecting to server', err);
        return;
    }
    console.log('Server Listening to port', port);
})

