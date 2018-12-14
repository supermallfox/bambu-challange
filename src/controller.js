'use strict';

const url = require('url');
const cal = require('./calculation');

const prop = require('properties-reader')('./properties/app.properties');
const bottomScore = prop.get('app.lowestScoreToShow') ? prop.get('app.lowestScoreToShow') : 0.4; //Default is 0.4
const numberOfResults = prop.get('app.maxNumberOfResultsReturned') ? prop.get('app.maxNumberOfResultsReturned') : 5000; //Default is 5000

module.exports = {

    defaultGet: function(request, response) {
        console.log('Send to default page. ');
        response.sendFile('views/default.html', {root: __dirname});
    }, 

    searchPpl: function(dataJson, request, response) {
        console.log('Start processing data');
        console.log('Lowest score to show: ' + bottomScore);
        console.log('Max results to return: ' + numberOfResults);

        let resultList = [];
        for (let index = 0; index < dataJson.length; index++) {
            let score = cal.calculateConfidence(dataJson[index],  
                request.query.age,
                request.query.latitude, 
                request.query.longitude, 
                request.query.monthlyIncome, 
                request.query.experienced);

            if (score >= bottomScore) {
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
        resultList = resultList.slice(0, numberOfResults);

        response.send({
            'peopleLikeYou': resultList
        });

        response.end();
    }
};
