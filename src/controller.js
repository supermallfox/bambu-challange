'use strict';

const url = require('url');
const cal = require('./calculation');

module.exports = {

    defaultGet: function(request, response) {
        console.log('Send to default page. ');
        response.sendFile('views/default.html', {root: __dirname});
    }, 

    searchPpl: function(dataJson, request, response) {
        console.log('Start processing data');

        let resultList = [];
        for (let index = 0; index < dataJson.length; index++) {
            let score = cal.calculateConfidence(dataJson[index],  
                request.query.age,
                request.query.latitude, 
                request.query.longitude, 
                request.query.monthlyIncome, 
                request.query.experienced);

            if (score >= 0.4) {
                resultList.push({
                    'name': dataJson[index]['name'],
                    'age': Number(dataJson[index]['age']),
                    'latitude': dataJson[index]['latitude'],
                    'longitude': dataJson[index]['longitude'],
                    'monthlyIncome': Number(dataJson[index]['monthly income']),
                    'experienced': dataJson[index]['experienced'],
                    'score': score
                });
            }
        }

        cal.sortDataOnScoreDesc(resultList);

        response.send({
            'peopleLikeYou': resultList
        });

        response.end();
    }
};
