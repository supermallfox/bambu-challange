'use strict'

module.exports = function(app, dataJson) {
    const controller = require('./controller');

    app.route('/people-like-you')
        .get(function (request, response) {
            console.log('Get request on /people-like-you');
            console.log('Parameters: ' + JSON.stringify(request.query));
            controller.searchPpl(dataJson, request, response);
        });

    app.route('/*')
        .get(function (request, response) {
            console.log('Get request on /*');
            controller.defaultGet(request, response);
        });
};