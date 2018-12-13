'use strict'

module.exports = function(app, dataJson) {
    const controller = require('./controller');

    app.route('/people-like-you')
        .get(function (request, response) {
            controller.searchPpl(dataJson, request, response);
        });

    app.route('/*')
        .get(function (request, response) {
            controller.defaultGet(request, response);
        });
};