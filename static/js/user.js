/* modified from code put together by Ai Vu, and updated to adjust for
return types independent of strings */

let User = class {
    constructor(first, last, age, height, weight, exercise_time, exercise_days,
        hiking_exp, health_assess) {
            //user name
            this.firstname = first;
            this.lastname = last;
            //age = user age
            this.age = age;
            //height = user height in inches
            this.height = height;    
            //weight = user weight in pounds
            this.weight = weight;
            //exercise_time = user reported avg length of workout in min
            this.exercise_time = exercise_time;
            //exercise_days = user reported avg days worked out per week
            this.exercise_days = exercise_days;
            //hiking_exp = user reported hiking exp (bool type)
            this.hiking_exp = hiking_exp;
            //health_assess = user reported assessment of health
            this.health_assess = health_assess;
    }

    // Getter for BMI
    get bmi() {
        return this.calcBMI();
    }
    // the method that will calculate BMI
    calcBMI() {
        return this.weight / this.height;
    }
    
    //Getter for the User Rec
    get userRec() {
        return this.calcRec();
    }

    //the method to calculate the user rec
    calcRec() {
        //this will be an int 0-6 for the user
        var userRec = 0;

        //if the user is less than 55, give a +1 for rec
        if (this.age < 55){
            userRec = userRec + 1;
        }
        //if the user's BMI is in healthy range, give a +2 for rec
        if (this.bmi >= 25 && this.bmi <= 30){
            userRec = userRec + 2;
        } 
        //else if the user is slightly overweight, but not morbidly obese,
        //just give +1
        else if (this.bmi > 30 && this.bmi <= 35){
            userRec = userRec + 1;
        }
        //if the user exercises 4 days a week, give a +1
        if (this.exercise_days > 4){
            userRec = userRec + 1;
        }
        //if the user's exercise time is > 30 minutes, give a +1
        if (this.exercise_time > 30){
            userRec = userRec + 1
        }
        //if the user has hiking experience, give a +1
        if (this.hiking_exp){
            userRec = userRec + 1;
        }
        //if the user is assessing their health adversely, and userRec
        //is already above 1, subtract 1 to give easier rec
        if (this.health_assess == 0 && userRec > 1){
            userRec = userRec - 1;
        }

        //return the final recommendation
        return userRec;
    }
};

  const handleFormSubmit = event => {
    // Stop the form from submitting since we’re handling that with AJAX.
    event.preventDefault();

    var first = document.getElementById("first").value;
    var last = document.getElementById("last").value;
    var age = document.getElementById("age").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var exercise_time = document.getElementById("exercise_time").value;
    var exercise_days = document.getElementById("exercise_days").value;
    var hiking_exp = document.getElementById("hiking_exp").value;
    var health_assess = document.getElementById("health_assess").value;

    //use form elements to create a session user
    var sessUser = new User(first, last, age, height, weight, exercise_time, exercise_days,
        hiking_exp, health_assess);
      
    //JSON-ify that user and save to a cookie
    document.cookie = 'userProfile='+JSON.stringify(sessUser);
  };

  const form = document.getElementsByClassName('UserForm')[0];
  form.addEventListener('submit', handleFormSubmit);
