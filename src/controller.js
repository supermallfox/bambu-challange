'use strict';

const url = require('url');

module.exports = {

    defaultGet: function(request, response) {
        response.redirect(url.format({
            pathname: '/people-like-you',
            query: request.query
        }));
    }, 

    searchPpl: function(dataJson, request, response) {
        let resultList = [];
        for (let index = 0; index < dataJson.length; index++) {
            let score = calculateConfidence(dataJson[index],  
                request.query.age,
                request.query.latitude, 
                request.query.longitude, 
                request.query.monthlyIncome, 
                request.query.experienced);

            if (score >= 0.4) {
                resultList.push({
                    "name": dataJson[index]['name'],
                    "age": dataJson[index]['age'],
                    "latitude": dataJson[index]['latitude'],
                    "longitude": dataJson[index]['longitude'],
                    "monthlyIncome": dataJson[index]['monthly income'],
                    "experienced": dataJson[index]['experienced'],
                    "score": score
                });
            }
        }

        response.send(resultList.length.toString());

        response.end();
    }
};

let calculateConfidence = function (dataObject, age, latitude, longitude, monthlyIncome, experienced) {
    let calList = [];

    if (age) {
        calList.push([dataObject['age'], age]);
    }

    if (latitude) {
        calList.push([dataObject['latitude'], latitude]);
    }

    if (longitude) {
        calList.push([dataObject['longitude'], longitude]);
    }

    if (monthlyIncome) {
        calList.push([dataObject['monthly income'], monthlyIncome]);
    }

    if (experienced) {
        calList.push([dataObject['experienced'] == experienced ? 1 : 0, 1]);
    }

    let averageWeight = 1 / calList.length;
    let result = 0;
    calList.forEach(function (entry) {
        //console.log(averageWeight + ' * (1 - Math.abs((' + entry[0] + ' - ' +  entry[1] + ') / ' + entry[1] + ')');
        result += averageWeight * (1 - Math.abs((entry[0] - entry[1]) / entry[1]));
        //console.log(result);
    }); 
    return Math.floor(result * 100) / 100;
}