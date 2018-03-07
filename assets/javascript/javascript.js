console.log("this one is working ")
//declaration
var place;
var options;
var addressDiv;
var dynamicStreet;
var dynamicCity;
var pos;
var s;
var e;
var dynamcilat;
var dynamcilng;
var dynamiccountry;
var outingWith;
//for the radio button and checkbox declartion
var venueArray = [];
var valu = [];
var radio_button_value = "test";

var withDate_R = ["gym", "beach"];
var withDate_E = ["theme park", "spa"];
var withDate_F = ["restarunts", "ice cream shop"];
var withDate_N = ["bar", "music venue"];
var withFriendsOptions = ["movie theaters", "bar"];
var byYourselfOptions = ["yoga", "cafe"]
//map variables
var directionsService;
var directionsDisplay;


//document ready function
$(document).ready(function () {
  $("#showresult").hide();

 getUserLocation();
  /* Get the checkboxes values and radio button values */


  //radio button function
  $('input[name=optradio]').click(function () {
    radio_button_value = $('input[name=optradio]:checked').val();
    console.log($('input[name=optradio]:checked').val());
    // console.log(radio_button_value);

  });
 

  //check box function
  function getValueUsingClass() {
    /* declare an checkbox array */
    var chkArray = [];
    $(".chk:checked").each(function () {
      chkArray.push($(this).val());
    });
    /* we join the array separated by the comma */
    var selected;
    selected = chkArray.join(',');

    /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    if (selected.length > 0) {
      console.log("You have selected " + selected);
      return selected;
      //alert("You have selected " + selected);	
    } else {
      alert("Please at least check one of the checkbox");
    }
  }



  // create a function for radio and chcek box values
  $.printvenue = function () {
    for (var i = 0; i < valu.length + 1; i++) {
      if ((radio_button_value === "Date") && (valu[i] === "Recreation")) {
        // console.log("Yes its a Date & recreation");
        venueArray = ["gym", "beach"];
      } else if ((radio_button_value === "Family") && (valu[i] === "Recreation")) {
        // console.log("Yes its a family outing & recreation")
        venueArray = ["hiking", "zoo"];
      } else if ((radio_button_value === "Friends") && (valu[i] === "Recreation")) {
        // console.log("Yes its a outing with friends & recreation")
        venueArray = ["golf", "paint ball"];
      } else if ((radio_button_value === "Solo") && (valu[i] === "Recreation")) {
        // console.log("Yes its a outing with coworkers & recreation")
        venueArray = ["gym", "golf"];
      } else if ((radio_button_value === "Date") && (valu[i] === "Entertainment")) {
        // console.log("Yes its a Date & Entertainment");
        venueArray = ["theme park", "spa"];
      } else if ((radio_button_value === "Family") && (valu[i] === "Entertainment")) {
        // console.log("Yes its a family outing & Entertainment")
        venueArray = ["museum", "mall"];
      } else if ((radio_button_value === "Friends") && (valu[i] === "Entertainment")) {
        // console.log("Yes its a outing with friends & Entertainment");
        venueArray = ["laser tag", "race track"];
      } else if ((radio_button_value === "Solo") && (valu[i] === "Entertainment")) {
        // console.log("Yes its a outing with coworkers & Entertainment");
        venueArray = ["stadium", "bowling"];
      } else if ((radio_button_value === "Date") && (valu[i] === "Food")) {
        // console.log("Yes its a Date & Food");
        venueArray = ["restaurants", "ice cream shop"];
      } else if ((radio_button_value === "Family") && (valu[i] === "Food")) {
        // console.log("Yes its a family outing & Food");
        venueArray = ["dinner", "bakery"];
      } else if ((radio_button_value === "Friends") && (valu[i] === "Food")) {
        // console.log("Yes its a outing with friends & Food");
        venueArray = ["irsh pub", "tacos"];
      } else if ((radio_button_value === "Solo") && (valu[i] === "Food")) {
        // console.log("Yes its a outing with coworkers & Food");
        venueArray = ["coffee", "cafe"];
      } else if ((radio_button_value === "Date") && (valu[i] === "Nightlife")) {
        // console.log("Yes its a Date & Nightlife");
        venueArray = ["music venue", "sports bar"];
      } else if ((radio_button_value === "Family") && (valu[i] === "Nightlife")) {
        // console.log("Yes its a family outing & Nightlife");
        venueArray = ["movie", "bowling"];
      } else if ((radio_button_value === "Friends") && (valu[i] === "Nightlife")) {
        // console.log("Yes its a outing with friends & Nightlife")
        venueArray = ["sports bar", "brewery"];
      } else if ((radio_button_value === "Solo") && (valu[i] === "Nightlife")) {
        // console.log("Yes its a outing with coworkers & Nightlife");
        venueArray = ["sports bar", "bowling"];
      }
    }
    //console.log(venueArray);
    return venueArray;
  }




  // Example queryURL 
  $("#add-location").click(function () {
    place = $("#locationBtn").val();
    console.log(place);

    valu.push(getValueUsingClass());
    $("#radioval").text(radio_button_value);
    $("#passing_array").text(valu);
    $.printvenue();



    options = venueArray;
    console.log( "Printing the venue" +options);

   // options = "coffee"
    var queryURL = "https://api.foursquare.com/v2/venues/search?near=" + place + "&query=recreation&v=20150214&m=foursquare&client_secret=UHNKEN2CPRB5IQCW2QMA52HXPXWVKRGXKKXJS1D3KNY020U5&client_id=TE4Q21LQYROBUGJJUAPRZBBOKEPNS5LEAOBWCZ4NMS0JAULJ&limit=5";



    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (data) {
      //    console.log(" city name  :"+ data.response.geocode.feature.displayName);


      //for getting the name of the venu palce dont use Json.stringfy
      var data_venues = data.response.venues;
      console.log( data_venues )
      for (var i = 0; i < data_venues.length; i++) {
        console.log("Inside the loop" + JSON.stringify(data_venues[i].name));
        //    $("#address").append(data_venues[i].name);
        // $("#street").append(data_venues[i].location.formattedAddress[0]);

        ////------>>>>>>>
        addressDiv = $("<br><button class='event' id='" + data_venues[i].location.formattedAddress[0] + "'><div>" + "Name is : " + data_venues[i].name + "</div>");
        dynamicStreet = $("<div>").text("Street is : " + data_venues[i].location.formattedAddress[0]);
        dynamicCity = $("<div>").text("City is : " + data_venues[i].location.formattedAddress[1]);
        dynamiccountry = $("<div>").text("Country  is : " + data_venues[i].location.formattedAddress[2]);
        addressDiv.append(dynamicStreet, dynamicCity, dynamiccountry);
        $("#address").append(addressDiv);
      }


      //------>>>>
 


      $(document).on("click", ".event", function (event) {


         e = $(this).attr("id")
      //  navigator.geolocation.getCurrentPosition(success);
        initMap();
        s = pos.lat + ',' + pos.lng;
        calculateAndDisplayRoute(directionsService, directionsDisplay, s, e);
        function success(pos) {
          console.log('Your current position is:');
          console.log("Latitude" + pos.coords.latitude);
          console.log("Longitude" + pos.coords.longitude);
          console.log("More or less  meters" + pos.coords.accuracy);

          calculateAndDisplayRoute(directionsService, directionsDisplay, s, e);

        }


      })



      // //------>>>>>
   console.log("zip code is " + data.response.venues["0"].location.postalCode);
      $("#street").text(JSON.stringify(data.response.venues[0].location.formattedAddress[0]));
      $("#city").text(JSON.stringify(data.response.venues[0].location.formattedAddress[1]));
     $("#country").text(JSON.stringify(data.response.venues[0].location.formattedAddress[2]));
      $("#latt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lat));
    $("#longt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lng));
       $("#latt2").text(JSON.stringify(data.response.venues[4].location.labeledLatLngs[0].lat));
    $("#longt2").text(JSON.stringify(data.response.venues[4].location.labeledLatLngs[0].lng));

    });

  });





  var map, infoWindow;

  function initMap() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {
        lat: 33.8358,
        lng: -118.3406
      }

    });
    directionsDisplay.setMap(map);
    infoWindow = new google.maps.InfoWindow;
  }

  function getUserLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
         
        }, function() {
            getLocationFromIp();

        });
      } else {

      } 
    }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
    directionsService.route({
      //origin: document.getElementById('latt1').value +','+document.getElementById('longt1'),
      //destination: document.getElementById('latt2').value +','+document.getElementById('longt2'),
      origin: start,
      destination: end,

      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        var result = document.getElementById('result');
        result.innerHTML = "";
        for (var i = 0; i < response.routes[0].legs[0].steps.length; i++) {
          result.innerHTML += response.routes[0].legs[0].steps[i].instructions + "<br>"
        }
         
        var startAddr = $("<div id = '#startAddress'>")
        $(startAddr).append("Start Address :"+response.routes["0"].legs["0"].start_address);
        $("#result").prepend(startAddr)
        var endAddr = $("<div id ='#endAddress'>")
        endAddr.append("End Addresss: "+response.routes["0"].legs["0"].end_address);
        $("#result").prepend(endAddr)

        var distanceDiv = $("<div id='distance'>")
        $(distanceDiv).append("Distance: "+response.routes["0"].legs["0"].distance.text);
        $("#result").prepend(distanceDiv)
        
        var durationDiv = $("<div id='duration'>")
        $(durationDiv).append("Duration : "+response.routes["0"].legs["0"].duration.text);
        $("#result").prepend(durationDiv)

        directionsDisplay.setDirections(response);
      }
      else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      marker.setMap(map);
      marker.setPosition(myRoute.steps[i].start_location);
      attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
    console.log(directionResult.routes[0].legs[0])
  }



  function getLocationFromIp() {
    $.ajax({
      url: "http://freegeoip.net/json/",
      method: 'GET'
    }).then(function (data) {
      pos  = {
        lat: data.latitude,
        lng: data.longitude
      
      };
    }
      )
  }

  function getingDynamicLatAndLng() {


  }

});

