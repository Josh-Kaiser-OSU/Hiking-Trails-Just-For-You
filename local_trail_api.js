
var Coordinates = require('./trail.js').Coordinates;
var Trail = require('./trail.js').Trail;
var TrailList = require('./trail.js').TrailList;
var https = require('https');

class Trail_API {
    constructor (latitude, longitude, distance = 10) {
        // User's latitude
        this.latitude = latitude;
        // User's longitude
        this.longitude = longitude;
        // Distance away from user trails will be found
        this.distance = distance;
        // Josh's Trail Data API key
        //'200932678-b6a96c1d20b73dc70bee2145176ce8a7'
        this.keys = '200975933-0d4568298c034509b0d68a318458e7ef';
        // The full URL for the request
        this.url = `https://www.hikingproject.com/data/get-trails?lat=${this._latitude}&lon=${this._longitude}&maxDistance=${this._distance}&key=${this._key}`;
        this.searchTrails()
        .then(console.log("Trails received"))
        .catch(err => console.log(err));
    }

    makeTrailsList(trailData){
        var trails = trailData.trails;
        this.allTrails = new TrailList();
        for (var i = 0; i < trails.length; i++) {
            // Trails arguments (name, distanceAway, length, elevation, description, latitude, longitude, difficulty)
            var aTrail = new Trail(trails[i].name,
                0,
                trails[i].length,
                trails[i].height,
                trails[i].summary,
                trails[i].latitude,
                trails[i].longitude,
                trails[i].difficulty)
                this.allTrails.addTrail(aTrail);
        }
    }
    
    searchTrails(){
        return new Promise((resolve, reject) => {
            var trailData = getTrailData();
            this.makeTrailsList(trailData);
        })
    }

    getTrails(){
        var trailArray = [];
        for (var i = 0; i < this.allTrails.getLength; i++){
            trailArray.push(this.allTrails.getTrail(i));
        }
        return trailArray;
    }

}

function getTrailData() {
    // Returns a trail data object from 
    return {
        "trails": [
            {
                "id": 7011192,
                "name": "Boulder Skyline Traverse",
                "type": "Recommended Route",
                "summary": "The classic long mountain route in Boulder.",
                "difficulty": "black",
                "stars": 4.7,
                "starVotes": 93,
                "location": "Superior, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7011192\/boulder-skyline-traverse",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_sqsmall_1555092747.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_small_1555092747.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_smallMed_1555092747.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_medium_1555092747.jpg",
                "length": 17.3,
                "ascent": 5446,
                "descent": -5524,
                "high": 8446,
                "low": 5424,
                "longitude": -105.2582,
                "latitude": 39.9388,
                "conditionStatus": "All Clear",
                "conditionDetails": "Dry",
                "conditionDate": "2020-09-16 14:37:11"
            },
            {
                "id": 7000130,
                "name": "Bear Peak Out and Back",
                "type": "Recommended Route",
                "summary": "A must-do hike for Boulder locals and visitors alike!",
                "difficulty": "black",
                "stars": 4.6,
                "starVotes": 123,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7000130\/bear-peak-out-and-back",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7005382_sqsmall_1554312030.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7005382_small_1554312030.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7005382_smallMed_1554312030.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7005382_medium_1554312030.jpg",
                "length": 5.7,
                "ascent": 2541,
                "descent": -2540,
                "high": 8342,
                "low": 6103,
                "longitude": -105.2755,
                "latitude": 39.9787,
                "conditionStatus": "All Clear",
                "conditionDetails": "",
                "conditionDate": "2020-10-22 13:00:06"
            },
            {
                "id": 7004226,
                "name": "Sunshine Lion's Lair Loop",
                "type": "Recommended Route",
                "summary": "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
                "difficulty": "blue",
                "stars": 4.5,
                "starVotes": 119,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7004226\/sunshine-lions-lair-loop",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_sqsmall_1555092747.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_small_1555092747.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_smallMed_1555092747.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_medium_1555092747.jpg",
                "length": 5.3,
                "ascent": 1261,
                "descent": -1282,
                "high": 6800,
                "low": 5530,
                "longitude": -105.2979,
                "latitude": 40.02,
                "conditionStatus": "All Clear",
                "conditionDetails": "Dry",
                "conditionDate": "2020-10-19 15:37:52"
            },
            {
                "id": 7011191,
                "name": "Green Mountain via Ranger\/Saddle Rock Loop",
                "type": "Recommended Route",
                "summary": "A loop with a variety of terrain, a lot of climbing, and great views of Boulder.",
                "difficulty": "black",
                "stars": 4.5,
                "starVotes": 89,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7011191\/green-mountain-via-rangersaddle-rock-loop",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7000517_sqsmall_1554159394.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7000517_small_1554159394.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7000517_smallMed_1554159394.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7000517_medium_1554159394.jpg",
                "length": 4.9,
                "ascent": 2305,
                "descent": -2277,
                "high": 8099,
                "low": 5806,
                "longitude": -105.2928,
                "latitude": 39.9975,
                "conditionStatus": "Minor Issues",
                "conditionDetails": "Snowy, Icy - Some snow\/ice in sections of the trail. Traction recommended!",
                "conditionDate": "2020-11-03 16:01:11"
            },
            {
                "id": 7002439,
                "name": "Walker Ranch",
                "type": "Recommended Route",
                "summary": "An awesome and challenging hike near Boulder with great scenery.",
                "difficulty": "blueBlack",
                "stars": 4.5,
                "starVotes": 139,
                "location": "Coal Creek, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7002439\/walker-ranch",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039625_sqsmall_1555092312.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039625_small_1555092312.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039625_smallMed_1555092312.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039625_medium_1555092312.jpg",
                "length": 7.6,
                "ascent": 1594,
                "descent": -1585,
                "high": 7335,
                "low": 6439,
                "longitude": -105.3378,
                "latitude": 39.9511,
                "conditionStatus": "All Clear",
                "conditionDetails": "Snowy, Some Mud",
                "conditionDate": "2020-11-15 17:13:53"
            },
            {
                "id": 7004682,
                "name": "Royal Arch Out and Back",
                "type": "Recommended Route",
                "summary": "A classic Boulder hike to a natural arch with great views.",
                "difficulty": "black",
                "stars": 4.4,
                "starVotes": 158,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7004682\/royal-arch-out-and-back",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002679_sqsmall_1554226731.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002679_small_1554226731.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002679_smallMed_1554226731.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002679_medium_1554226731.jpg",
                "length": 3.3,
                "ascent": 1311,
                "descent": -1312,
                "high": 6917,
                "low": 5691,
                "longitude": -105.283,
                "latitude": 39.9997,
                "conditionStatus": "All Clear",
                "conditionDetails": "Mostly Dry",
                "conditionDate": "2020-10-18 17:03:19"
            },
            {
                "id": 7000000,
                "name": "Mount Sanitas Loop",
                "type": "Recommended Route",
                "summary": "Very popular and scenic loop right from the edge of town.",
                "difficulty": "blueBlack",
                "stars": 4.1,
                "starVotes": 110,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7000000\/mount-sanitas-loop",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_sqsmall_1555092747.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_small_1555092747.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_smallMed_1555092747.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7039883_medium_1555092747.jpg",
                "length": 3.2,
                "ascent": 1281,
                "descent": -1280,
                "high": 6780,
                "low": 5521,
                "longitude": -105.2977,
                "latitude": 40.0202,
                "conditionStatus": "All Clear",
                "conditionDetails": "Dry",
                "conditionDate": "2020-10-14 19:04:37"
            },
            {
                "id": 7001019,
                "name": "Betasso Preserve",
                "type": "Recommended Route",
                "summary": "This hike is easily accessible from Boulder and offers amazing singletrack with beautiful views.",
                "difficulty": "blue",
                "stars": 4.2,
                "starVotes": 75,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7001019\/betasso-preserve",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7029200_sqsmall_1554920151.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7029200_small_1554920151.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7029200_smallMed_1554920151.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7029200_medium_1554920151.jpg",
                "length": 6.7,
                "ascent": 776,
                "descent": -778,
                "high": 6575,
                "low": 6178,
                "longitude": -105.3446,
                "latitude": 40.0164,
                "conditionStatus": "All Clear",
                "conditionDetails": "",
                "conditionDate": "2020-10-17 19:04:26"
            },
            {
                "id": 7004594,
                "name": "Green Mountain West Ridge",
                "type": "Recommended Route",
                "summary": "The easiest route to the spectacular summit of Green Mountain.",
                "difficulty": "blueBlack",
                "stars": 4,
                "starVotes": 33,
                "location": "Boulder, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7004594\/green-mountain-west-ridge",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7003740_sqsmall_1554235436.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7003740_small_1554235436.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7003740_smallMed_1554235436.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7003740_medium_1554235436.jpg",
                "length": 3.9,
                "ascent": 633,
                "descent": -634,
                "high": 8077,
                "low": 7607,
                "longitude": -105.3232,
                "latitude": 39.9833,
                "conditionStatus": "All Clear",
                "conditionDetails": "Dry",
                "conditionDate": "2020-09-19 19:29:09"
            },
            {
                "id": 7017569,
                "name": "Marshall Mesa to Spring Brook Loop",
                "type": "Recommended Route",
                "summary": "Some of the best trails that Boulder has to offer with a variety of options that never get old.",
                "difficulty": "blue",
                "stars": 4.3,
                "starVotes": 26,
                "location": "Superior, Colorado",
                "url": "https:\/\/www.hikingproject.com\/trail\/7017569\/marshall-mesa-to-spring-brook-loop",
                "imgSqSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002458_sqsmall_1554226116.jpg",
                "imgSmall": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002458_small_1554226116.jpg",
                "imgSmallMed": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002458_smallMed_1554226116.jpg",
                "imgMedium": "https:\/\/cdn2.apstatic.com\/photos\/hike\/7002458_medium_1554226116.jpg",
                "length": 11.1,
                "ascent": 893,
                "descent": -893,
                "high": 6236,
                "low": 5567,
                "longitude": -105.2313,
                "latitude": 39.9527,
                "conditionStatus": "All Clear",
                "conditionDetails": "Dry",
                "conditionDate": "2020-11-07 11:03:26"
            }
        ],
        "success": 1
    }
}

module.exports.Trail_API = Trail_API;