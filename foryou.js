var Trail = require('./trail.js').Trail;
var TrailList = require('./trail.js').TrailList;
var User = require('./user.js').User;

//Express boilerplate code
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(session({secret:'SuperSecretPassword'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//get userProfile from cookie
app.get('/trails', function(req, res){
	userProfile = JSON.parse(req.session.userProfile);
}

//needs to make filter whenever new location is sent
function createFilter(allTrailsList){
	
	filter = new ForYouFilter(userProfile, allTrailsList);
}

//runs filterList when Just For You request sent
let form  = document.getElementByClassName('forYouFilter');
form.addEventListener('submit', (event) => {
    event.preventDefault();
	filteredList = filter.filterList(forYouDropDown.value);
	//needs to send filteredList to trails.handlebars
});

//implements the For You feature
class ForYouFilter{
	constructor(userProfile, allTrailsList)
	{
		this.userRating = userProfile.userRec;
		this.allTrailsList = allTrailsList;
	}
	
	//returns a TrailList containing the trails that match the request difficulty
	filterList(request){
		if(request == "easy"){
			return addTrails(easyCheck);
		}
		else if(request == "medium"){
			return addTrails(medCheck);
		}
		
		else if(request == "hard"){
			return addTrails(hardCheck);
		}
		
		else{
			return allTrailsList;
		}
	}
	
	//goes through the main TrailList and adds Trails matching the request difficulty to the filtered TrailList
	addTrails(checkTrail){
		var filteredList = new TrailList()
		for(trail in allTrailsList){
			if(checkTrail(trail)){
				filteredList.addTrail(trail);
			}
		}
		return filteredList;
	}
		
//checks if trail difficulty is easier than user rating		
	easyCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating < traildiffuculty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty matches user rating		
	medCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating == traildiffuculty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty is harder than user rating		
	hardCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating < traildiffuculty){
			return true;
		}
		else{
			return false;
		}
	}
	
//Since the API stores difficulty as a string, this function converts it to an int
	difficultyConverter(aTrail){
		switch(aTrail.getDifficulty){
			case "dblack":
				return 6;
				break;
			case "black":
				return 5;
				break;
			case "blueBlack":
				return 4;
				break;
			case "blue":
				return 3;
				break;			
			case "greenBlue":
				return 2;
				break;
			case "green":
				return 1;
				break;
		}
	}
}

module.exports.ForYouFilter = ForYouFilter;