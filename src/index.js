const express = require('express');
const ctj = require('csvtojson');
const utility = require('./utility');

const dataFilePath = './data/data.csv';

let app = express();
let dataJson;

((async () => {
    dataJson = await ctj().fromFile(dataFilePath);

    console.log(utility.roughSizeOfObject(dataJson));

    app.get('/people-like-you', function(request, response) {
        response.send(dataJson[0]);
    });

    app.get('/*', function(request, response) {
        response.redirect('/people-like-you');
    });

    let server = app.listen(8081, function() {
        let host = server.address().address;
        let port = server.address().port;
    
        console.log("Application started at http://%s:%s", host, port);
    });

})()).catch(console.error);

