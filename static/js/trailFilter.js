function hideTrail(element) {
    element.style.display = "none";
}

function displayTrail(element){
    element.style.display = "inline";
}


//implements the For You feature
class ForYouFilter{
	constructor(trails, userRating = 3){
        this.trails = trails;
        this.userRating = userRating;
		this.converterArray = {"green": 1, "greenBlue": 2, "blue": 3, "blueBlack": 4, "black": 5, "dblack": 6};
	}
	
	//returns a TrailList containing the trails that match the request difficulty
	filterList(request){
		if(request == "easy" || request == "medium" || request == "hard") {
            for(var i = 0; i < this.trails.length; i++){
                // Get trail difficul from HTML
                let difficulty = this.trails[i].firstElementChild.nextElementSibling.nextElementSibling.innerText;
                var trailDifficulty = this.converterArray[difficulty.slice(18, difficulty.length)];
                
                hideTrail(this.trails[i]);
				if(request == 'easy' && trailDifficulty < this.userRating){
					displayTrail(this.trails[i]);
				} else if (request == "medium" && trailDifficulty == this.userRating) {
                    displayTrail(this.trails[i]);
				} else if(request == "hard" && trailDifficulty > this.userRating) {
					displayTrail(this.trails[i]);
				}
			}
		}
	}
}

if (document.cookie) {
    let userInfo = JSON.parse(document.cookie.slice(12, document.cookie.length));
    let currentUser = new User(userInfo.first, userInfo.last, userInfo.age, userInfo.height, userInfo.weight, 
        userInfo.exercise_time, userInfo.exercise_days, userInfo.hiking_exp, userInfo.health_assess);

    // Make the dropdown filter the Trails
    let dropDown = document.getElementById("forYouDropDown")
    dropDown.addEventListener("change", ()=>{
        let choice = dropDown.value;
        let allTheTrails = document.getElementsByClassName("trail");
        let currentFilter = new ForYouFilter(allTheTrails, currentUser.userRec);
        currentFilter.filterList(choice);
    });
}
