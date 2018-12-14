const cal = require('../src/calculation')
const assert = require('assert');

it('Test confidence score calculation: age only', function() {

    let testObj = {"name":"Clarinda","age":99,"latitude":"-38.9548478","longitude":"-68.1030149","monthly income":10269,"experienced":"true"}

    let expected = Math.floor((1 - (150 - 99) / 150) * 100) / 100;

    assert.equal(cal.calculateConfidence(testObj, 150, undefined, undefined, undefined, undefined), expected);
});

it('Test confidence score calculation: latitude and longitude', function() {

    let testObj = {"name":"Laryssa","age":33,"latitude":"52.1985472","longitude":"20.6169567","monthly income":12310,"experienced":"true"}

    let expected = Math.floor(((1 - (52.1985472 - 40.71667) / 40.71667) * 0.5 + (1 - (20.6169567 - 19.56667) / 19.56667) * 0.5 ) * 100) / 100;

    assert.equal(cal.calculateConfidence(testObj, undefined, 40.71667, 19.56667, undefined, undefined), expected);
});

it('Test confidence score calculation: experienced only', function() {

    let testObj1 = {"name":"Laryssa","age":33,"latitude":"52.1985472","longitude":"20.6169567","monthly income":12310,"experienced":"true"}
    let testObj2 = {"name":"Kimmie","age":97,"latitude":"34.149491","longitude":"-118.099449","monthly income":9333,"experienced":"false"};

    let expected1 = 1;
    let expected2 = 0;

    assert.equal(cal.calculateConfidence(testObj1, undefined, undefined, undefined, undefined, 'true'), expected1);
    assert.equal(cal.calculateConfidence(testObj2, undefined, undefined, undefined, undefined, 'true'), expected2);
});

it('Test confidence score calculation: salary only', function() {

    let testObj = {"name":"Kippy","age":35,"latitude":"34.0237477","longitude":"131.9348946","monthly income":9555,"experienced":"true","score":0.95};

    let expected = Math.floor((1 - (10000 - 9555) / 9555) * 100) / 100;

    assert.equal(cal.calculateConfidence(testObj, undefined, undefined, undefined, 10000, undefined), expected);
});

it('Test confidence score calculation: All parameters', function() {

    let testObj = {"name":"Fidole","age":42,"latitude":"49.902219","longitude":"20.636949","monthly income":12586,"experienced":"false"}

    let expected = Math.floor((
        (1 - (42 - 23) / 23) * 0.2 
        + (1 - (49.902219 - 40.71667) / 40.71667) * 0.2  
        + (1 - (20.636949 - 19.56667) / 19.56667) * 0.2 
        + (1 - (12586 - 5500) / 5500) * 0.2 
        + 0.2 
        ) * 100) / 100;

    assert.equal(cal.calculateConfidence(testObj, 23, 40.71667, 19.56667, 5500, 'false'), expected);
});