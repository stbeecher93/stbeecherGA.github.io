//Step 2: Reservation Data object
var reservationData = {};

//Step 1: Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyAA0ympPsHdKmA04vIhUwGpk9nd66R1Sgw",
    authDomain: "lph-reservations.firebaseapp.com",
    databaseURL: "https://lph-reservations.firebaseio.com",
    projectId: "lph-reservations",
    storageBucket: "lph-reservations.appspot.com",
    messagingSenderId: "1059701741608",
    appId: "1:1059701741608:web:ceba293000e3f5c075bd1d"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//Step 3: Day Data
$('.reservation-day li').on('click', function(){
  reservationData.day = $(this).text();
  $('.dropdown-toggle').text($(this).text());
});

//Step 4: Name Data and Step 5: Push to Database
$('.reservations').on('submit', function(e){
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
  database.ref('reservations').push(reservationData);
});

//Step 6: Updating the View
database.ref('reservations').on('child_added', function(snap) {
	var reservationList = $('.reservation-list');
	var allReservations = snap.val();
	var source = $('#reservation-template').html();
	var template = Handlebars.compile(source);
	var reservationTemplate = template(allReservations);
	reservationList.append(reservationTemplate);
});

//Step 7: Initialize Map
function initMap() {
	//Step 8: Google Maps Map
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 35.014673, lng: -106.686342},
		zoom: 17,
    	scrollwheel: false
	});
	//Step 9: Google Maps Marker
	var marker = new google.maps.Marker({
		position: {lat: 35.014673, lng: -106.686342},
		map: map,
		title: 'Los Pollos Hermanos'
	});
}

//Bonus Part 1: Get Current Date, Time, and Day of Week
var today = new Date();
var date = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
var time = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();
var dayOfWeekInt = today.getDay();
var dayOfWeek = "";

switch (dayOfWeekInt){
	case 0:
		dayOfWeek = "Sunday";
		break;
	case 1:
		dayOfWeek = "Monday";
		break;
	case 2:
		dayOfWeek = "Tuesday";
		break;
	case 3:
		dayOfWeek = "Wednesday";
		break;
	case 4:
		dayOfWeek = "Thursday";
		break;
	case 5:
		dayOfWeek = "Friday";
		break;
	case 6:
		dayOfWeek = "Saturday";
		break;
}
var dateAndTime = time + " on " + dayOfWeek + ", " + date;

//Bonus Part 2: Calculate if Store is Open or Closed Based on Hours
var now = today.getHours() + "." + today.getMinutes();
var storeHours = [
	["Sunday", 7.00, 21.00],
	["Monday", 7.00, 22.00],
	["Tuesday", 7.00, 22.00],
	["Wednesday", 7.00, 22.00],
	["Thursday", 7.00, 22.00],
	["Friday", 7.00, 23.59],
	["Saturday", 7.00, 23.59]
];
var storeDay = storeHours[dayOfWeekInt];
var openOrClosed = "";

if (now > storeDay[1] && now < storeDay[2]) {
	openOrClosed = "open!";
} else {
	openOrClosed = "closed.";
}

//Bonus Part 3: Display Results of Parts 1 and 2
$('#current-date').html("It is currently " + dateAndTime + ". The store is now " + openOrClosed);