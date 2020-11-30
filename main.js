//Express boilerplate code
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');


//import Trail_API
// ** This Trail_API is mock data because we were locked out of the API **
const Trail_API = require('./new_trail_api.js').Trail_API;

//import ZipToLatLong to convert zip codes to latitude and longitude
const ZipToLatLong = require('./zip_to_lat_long.js').ZipToLatLong;
const zipToCoords = new ZipToLatLong();

const ForYouFilter = require('./foryou.js').ForYouFilter;
const { callbackify } = require('util');

var app = express();
app.use(session({secret:'SuperSecretPassword'}));
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', '56654');


//establish static page for js and css files
app.use(express.static(path.join(__dirname, 'static')));

//load user page as home display
app.get('/',function(req, res){
  res.render('user');
});

//load Trail display page
app.get('/trails',function(req, res){
  //line from foryou.js to be integrated into trail display
  //userProfile = JSON.parse(req.session.userProfile);
  la_latitude = 40.0274;
  la_longitude = -105.2519;
  //Default location is LA
  // Rendering the page in this way allows the trailList to be accessed with the trailList variable
  var user = cookieParser.JSONCookie(res.cookie.userProfile);
  res.render('trails', {"trailList": pingTrailAPI(la_latitude,la_longitude, undefined, user)});
});

//load Trail display after new location input
app.post('/trails',function(req,res){
  //line from foryou.js to be integrated into trail display
  //userProfile = JSON.parse(req.session.userProfile);
  // console.log(req.cookie);
  // We need to find zipToCoords Asynchronously
  zipToCoords.convert(req.body.zipcode)
  .then((result)=>{
    var [request_lat, request_long] = result;
    console.log(request_lat, request_long);
	var user = cookieParser.JSONCookie(res.cookie.userProfile);
    pingTrailAPI(request_lat, request_long, req.body.forYouDropDown, user, res);
    
  })
  .catch((error)=>{
      console.log(error);
  });
  
  //, {"trailList": newLocation(la_latitude, la_longitude)});
});


//error status 404
app.use(function(req,res){
  res.status(404);
  res.render('404');
});


//error 505
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//display page on localhost:3000
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

//ping the API for the location of the trail and return the trailList
async function pingTrailAPI(latitude,longitude, forYouDropDown, user, res) {
  const myTrails = new Trail_API(latitude, longitude);
  myTrails.getTrails()
  .then(() => {
      // myTrails.makeTrailsList(result);
      const filteredTrails = new ForYouFilter(user,myTrails,forYouDropDown);
      return filteredTrails.allTrailsList.getTrails();
  }).then((trails)=>{
    res.render('trails', {"trailList": trails});
  }).catch(err => console.log(err))
  
}