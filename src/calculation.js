'use strict';

module.exports = {

    calculateConfidence: function (dataObject, age, latitude, longitude, monthlyIncome, experienced) {
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
    }, 
    
    sortDataOnScoreDesc : function (dataArr) {
    dataArr.sort(function(a, b) {return b['score'] - a['score']});
    }
};