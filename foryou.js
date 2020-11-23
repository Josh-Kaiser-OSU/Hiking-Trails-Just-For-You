var Trail = require('./trail.js').Trail;

//implements the For You feature
class ForYouFilter{
	constructor(userProfile, allTrailsList, request)
	{
		
		this.userRating = userProfile.userRec || 3;
		this.allTrailsList = allTrailsList;
		filterList(request);
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
		var filteredList = allTrailsList.filter(checkTrail);
	}
		
//checks if trail difficulty is easier than user rating		
	easyCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating < traildifficulty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty matches user rating		
	medCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating == traildifficulty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty is harder than user rating		
	hardCheck(aTrail){
		var traildifficulty = difficultyConverter(aTrail);
		if(userRating < traildifficulty){
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