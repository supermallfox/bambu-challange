'use strict';

const express = require('express');
const ctj = require('csvtojson');
const utility = require('./utility');
const routes = require('./router');

const dataFilePath = './data/data.csv';

let app = express();
let dataJson;

((async () => {
    console.log('Loading data from %s.', dataFilePath);

    dataJson = await ctj().fromFile(dataFilePath);
    
    console.log("Rought data size in memory: %s", utility.roughSizeOfObject(dataJson));

    routes(app, dataJson);

    let server = app.listen(8080, function() {
        let host = server.address().address;
        let port = server.address().port;
    
        console.log("Application started at http://%s:%s", host, port);
    });

})()).catch(console.error);

