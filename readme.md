
# Note from Yuanpeng: 
1) This has been done based on my limited NodeJS knowledge, so please have mercy when reviewing it... :)
2) It has been deployed to Google Cloud, please try it out on: https://bambu-challenge-yp.appspot.com/
3) Regarding the algorithm to calculate the confidence score for a record, I was not sure what should be a most accurate one, so I just made one by myself. It is as below: 
    - It treats all input parameters equally, meaning, if "?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false" is input, and there are 5 of them, each of them would get a weight of 1 / 5 = 0.2; If it is "?age=23&monthlyIncome=5500", each of them would get a weight of 1 / 2 = 0.5. 
    - For each input parameters, it calculates the confidence score as below: <br />
    *diff_rate = abslute_value( input_value - record_value ) / input_value*<br />
    *similarity = 1 - diff_rate*<br />
    *confidence_score = similarity * weight*
    - The overall confidence score = sum of confidence scores of all input parameters (with 2 decimal places)
4) I only added some unit test cases at the end, it was not a proper way of doing it, I'm sorry about it. Mainly it was because I was busy with some othe work and only kicked it off yesterday, I had to rush it. In addition, by just running the service locally (and as the only developer), it was easier to do any testing by just printing everything out. 
5) Regarding the returned result list, now I set up 2 rules: 
    - Only records with confidence score >= 0.4 are displayed. <br />
    or <br />
    - At most 5000 records are returned. <br />
  These numbers are set up in /properties/app.properties. 
6) If you need any additional info, kindly let me know. :)

## Below is the original readme: 
# BAMBU Backend Engineer Test

With a data in this repo, build an API that sends 10 potential investor similar with a person described in the query parameters.

- the endpoint is exposed at `people-like-you`
- each of the terms in the query parameters is optional
- the endpoint returns a JSON response with an array of scored suggested matches
    - the suggestions are sorted by descending score
    - each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)

#### Sample responses

**Match found**

    GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

```json
{
  "peopleLikeYou": [
    {
      "name": "Dorthea",
      "age": 24,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5532,
      "experienced": false, 
      "score": 0.9
    },
    {
      "name": "Francesco",
      "age": 25,
      "latitude": "40.7223",
      "longitude": "19.55264",
      "monthlyIncome": 5578,
      "experienced": false,
      "score": 0.9
    },
    {
      "name": "Jarib",
      "age": 20,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5700,
      "experienced": true,
      "score": 0.8
    },
    {
      "name": "Merv",
      "age": 22,
      "latitude": "40.7233",
      "longitude": "19.5526",
      "monthlyIncome": 6309,
      "experienced": true,
      "score": 0.6
    },
    {
      "name": "Jorrie",
      "age": 19,
      "latitude": "40.7344",
      "longitude": "19.6200",
      "monthlyIncome": 6488,
      "experienced": false,
      "score": 0.6
    },
    {
      "name": "Branden",
      "age": 27,
      "latitude": "40.4522",
      "longitude": "19.67011",
      "monthlyIncome": 4312,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Delila",
      "age": 30,
      "latitude": "40.49492",
      "longitude": "19.25686",
      "monthlyIncome": 7340,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Franzen",
      "age": 40,
      "latitude": "40.99926",
      "longitude": "20.55256",
      "monthlyIncome": 7437,
      "experienced": false,
      "score": 0.4
    },
    {
      "name": "Latrena",
      "age": 42,
      "latitude": "40.99232",
      "longitude": "19.55256",
      "monthlyIncome": 8822,
      "experienced": true,
      "score": 0.4
    },
    {
      "name": "Ulberto",
      "age": 37,
      "latitude": "41.7232",
      "longitude": "19.75256",
      "monthlyIncome": 8129,
      "experienced": true,
      "score": 0.4
    },
  ]
}
```

**Match not found**

    GET /people-like-you?age=1000

```json
{
  "peopleLikeYou": []
}
```

## Guidelines

- Your code should be written in JS
- Design and implement your solution as you would do for real production code
- Don't forget unit tests
- You can add new features to your liking
- Your submission would be reviewed based on these criteria:
    - Performance
    - Code quality
    - Tooling choices
    - Additional features
- To submit your work, deploy the app to a public cloud and give us the URL. You’ll also need to send us the link of the repository containing the required source to us and we are willing to have a look on how you build the system step by step
- DO NOT copy a solution. If we found your work is exactly same with another candidate, we may have to terminate the review process