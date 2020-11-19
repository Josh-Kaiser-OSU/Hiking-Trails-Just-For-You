var express = require('express');
const path = require('path');


//import Trail_API
// ** This Trail_API is mock data because we were locked out of the API **
const Trail_API = require('./local_trail_api.js').Trail_API;
//import ZIP
const ZipToLatLong = require('./zip_to_lat_long.js').ZipToLatLong;
const zipToCoords = new ZipToLatLong();
// For testing ZipToCoords
zipToCoords.convert(90210)
.then((result)=>{
console.log(result);
})
.catch((error)=>{
    console.log(error);
});

//use express handlebars
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', '3000');


//establish static page for js and css files
app.use(express.static(path.join(__dirname, 'static')));

//load user page as home display
app.get('/',function(req, res){
  res.render('user');
});

//load Trail display page
app.get('/trails',function(req, res){
  la_latitude = 40.0274;
  la_longitude = -105.2519;
  //Default location is LA
  // Rendering the page in this way allows the trailList to be accessed with the trailList variable
  res.render('trails', {"trailList": newLocation(la_latitude, la_longitude)});
});

//load Trail display after new location input
app.post('/trails',function(req,res){
  // ** this area is not currently working **
  console.log("requested latitude: ", req.latitude);
  console.log("requested longitude: ", req.longitude);
  request_lat = 40.0274;
  request_long = -105.2519;
  res.render('trails');
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
function newLocation(latitude,longitude) {
  const myTrails = new Trail_API(latitude, longitude);
  return myTrails.getTrails();
}