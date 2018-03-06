       
       //declaration
        var place;
        var options;
        var addressDiv;
        var dynamicStreet;
        var dynamicCity;
        var dynamiccountry;
        var dynamcilat;
        var dynamcilng;
        var outingWith;
        var userPosition;
        var s;
        var e;

        //for the radio button and checkbox declartion
        var valu=[];
        var radio_button_value="test";

        var venueArray=[];
        var withFriendsOptions=["movie theaters","bar"];
        var byYourselfOptions =["yoga","cafe"]
       //map variables
       var directionsService;
       var directionsDisplay;

        //document ready function
        $(document).ready(function () {
            $("#showresult").hide();
            getUserLocation();
          /* Get the checkboxes values and radio button values */


        //radio button function
        $('input[name=optradio]').click(function() {
          radio_button_value= $('input[name=optradio]:checked').val();
            //console.log($('input[name=optradio]:checked').val());
            // console.log(radio_button_value);
          });
       // console.log(radio_button_value);

      //check box function
      function getValueUsingClass(){
        /* declare an checkbox array */
        var chkArray = [];
        $(".chk:checked").each(function() {
          chkArray.push($(this).val());
        });   
        /* we join the array separated by the comma */
        var selected;
        selected = chkArray.join(',') ;
        
        /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
        if(selected.length > 0){
          //console.log("You have selected " + selected);
          return selected;	
          //alert("You have selected " + selected);	
        }else{
          alert("Please at least check one of the checkbox");	
        }
      }

         
         //create a function for radio and chcek box values
        //  $.fn.checkfunction = function(){
        //   if (radio_button_option === "Date"){
        //       outingWith=$('input[name=optradio]:checked').val();
        //       console.log("Yes its a Date"+ outingWith);
        //     }else if(radio_button_option === "Family"){
        //       console.log("Yes its a family outing")
        //     }else if(radio_button_option === "Friends"){
        //       console.log("Yes its a outing with friends")

        //     }else{
        //       console.log("Yes its a outing with coworkers")
        //     }

        //  }

    // create a function for radio and chcek box values
     $.printvenue = function(){
        for( var i=0; i < valu.length +1; i++){
            if ((radio_button_value === "Date") && (valu[i] === "Recreation")){
               // console.log("Yes its a Date & recreation");
               venueArray=["gym","beach"];
            }else if((radio_button_value === "Family") && (valu[i] === "Recreation")){
                // console.log("Yes its a family outing & recreation")
                venueArray=["hiking","zoo"];
            }else if((radio_button_value === "Friends") && (valu[i] === "Recreation")){
                // console.log("Yes its a outing with friends & recreation")
                venueArray=["golf","paint ball"];
            }else if((radio_button_value === "Solo") && (valu[i] === "Recreation")){
                // console.log("Yes its a outing with coworkers & recreation")
                venueArray=["gym","golf"];

            } else           if ((radio_button_value === "Date") && (valu[i] === "Entertainment")){
                // console.log("Yes its a Date & Entertainment");
                venueArray=["theme park","spa"];
            }else if((radio_button_value === "Family") && (valu[i] === "Entertainment")){
                // console.log("Yes its a family outing & Entertainment")
                venueArray=["museum","mall"];
            }else if((radio_button_value === "Friends") && (valu[i] === "Entertainment")){
                // console.log("Yes its a outing with friends & Entertainment");
                venueArray=["laser tag","race track"];

            }else if((radio_button_value === "Solo") && (valu[i] === "Entertainment")){
                // console.log("Yes its a outing with coworkers & Entertainment");
                venueArray=["stadium","bowling"];
            }else           if ((radio_button_value === "Date") && (valu[i] === "Food")){
                // console.log("Yes its a Date & Food");
                venueArray=["restaurants","ice cream shop"];
            }else if((radio_button_value === "Family") && (valu[i] === "Food")){
                // console.log("Yes its a family outing & Food");
                venueArray=["dinner","bakery"];
            }else if((radio_button_value === "Friends") && (valu[i] === "Food")){
                // console.log("Yes its a outing with friends & Food");
                venueArray=["irsh pub","tacos"];
            }else if((radio_button_value === "Solo") && (valu[i] === "Food")){
                // console.log("Yes its a outing with coworkers & Food");
                venueArray=["coffee","cafe"];
            } else           if ((radio_button_value === "Date") && (valu[i] === "Nightlife")){
                // console.log("Yes its a Date & Nightlife");
                venueArray=["music venue","sports bar"];
            }else if((radio_button_value === "Family") && (valu[i] === "Nightlife")){
                // console.log("Yes its a family outing & Nightlife");
                venueArray=["movie","bowling"];
            }else if((radio_button_value === "Friends") && (valu[i] === "Nightlife")){
                // console.log("Yes its a outing with friends & Nightlife")
                venueArray=["sports bar","brewery"];
            }else if((radio_button_value === "Solo") && (valu[i] === "Nightlife")){
                // console.log("Yes its a outing with coworkers & Nightlife");
                venueArray=["sports bar","bowling"];
            }
        }
        //console.log(venueArray);
        return venueArray;

            }

        $("#btn").on("click", function(){
            initMap();
            console.log("current latt is "+userPosition.lat);
            console.log("current lon is "+userPosition.lng);

                 s = userPosition.lat + ',' +userPosition.lng;
                 e = $("#latt2").text() + ',' + $("#longt2").text();
            console.log(directionsService);
        calculateAndDisplayRoute(directionsService, directionsDisplay,  s, e);
        });

          // Example queryURL 
          $("#add-location").click(function(){
              place=$("#locationBtn").val();
              //console.log(place);
            
                valu.push(getValueUsingClass());
                $("#radioval").text(radio_button_value);
                $("#passing_array").text(valu);
                $.printvenue();

   
            console.log(" this is before the ajax "+venueArray);    

            
            options=venueArray[0];
          
          var queryURL = "https://api.foursquare.com/v2/venues/search?near="+place+"&query="+options+"&v=20150214&m=foursquare&client_secret=UHNKEN2CPRB5IQCW2QMA52HXPXWVKRGXKKXJS1D3KNY020U5&client_id=TE4Q21LQYROBUGJJUAPRZBBOKEPNS5LEAOBWCZ4NMS0JAULJ&limit=5";
        //query without a limit
        //   var queryURL = "https://api.foursquare.com/v2/venues/search?near="+place+"&query="+options+"&v=20150214&m=foursquare&client_secret=UHNKEN2CPRB5IQCW2QMA52HXPXWVKRGXKKXJS1D3KNY020U5&client_id=TE4Q21LQYROBUGJJUAPRZBBOKEPNS5LEAOBWCZ4NMS0JAULJ";
          //console.log(options);
          //console.log(place);

          $.ajax({
            url: queryURL,
            method: 'GET'
          }).then(function(data) {
        //    console.log(" city name  :"+ data.response.geocode.feature.displayName);
            console.log(data);
            //formatted address gives all things in one line
        //    console.log("Address : "+data.response.venues[0].location.formattedAddress);
        //    console.log("Address lat : "+ JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lat));
        //    console.log("Address lng : "+ JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lng));
          //  var data_venues=JSON.stringify(data.response.venues);

          //for getting the name of the venu palce dont use Json.stringfy
            var data_venues=data.response.venues;
            
            for( var i=0; i<data_venues.length;i++ ){
                //console.log("Inside the loop"+JSON.stringify( data_venues[i].name));
                //    $("#address").append(data_venues[i].name);
                // $("#street").append(data_venues[i].location.formattedAddress[0]);
                addressDiv=$("<br><div class='venueDiv' id='venueDivId_"+i+"'>"+ "Name is : "+ data_venues[i].name+"</div>");
                dynamicStreet=$("<div>").text("Street is : "+data_venues[i].location.formattedAddress[0]);
                dynamicCity=$("<div>").text("City is : "+data_venues[i].location.formattedAddress[1]);
                dynamiccountry=$("<div>").text("Country  is : "+data_venues[i].location.formattedAddress[2]);
                dynamcilat=$("<div>").text(JSON.stringify(data.response.venues[i].location.labeledLatLngs[0].lat));
                dynamcilng=$("<div>").text(JSON.stringify(data.response.venues[i].location.labeledLatLngs[0].lng));


               
                addressDiv.append(dynamicStreet,dynamicCity,dynamiccountry,dynamcilat, dynamcilng);
                $("#address").append(addressDiv);   
               // console.log(" this is lat inside the loop"+JSON.parse( dynamcilat) );
               // console.log(" the dynamic lat is in loop "+ JSON.stringify(data.response.venues[i].location.labeledLatLngs[0].lat));        
            }
            // console.log(data.response.venues["0"].name);
            // console.log("Inside the loop"+ data_venues[0].name);

             console.log("zip code is "+data.response.venues["0"].location.postalCode);
            // $("#street").text(JSON.stringify(data.response.venues[0].location.formattedAddress[0]));
            // $("#city").text(JSON.stringify(data.response.venues[0].location.formattedAddress[1]));
            // $("#country").text(JSON.stringify(data.response.venues[0].location.formattedAddress[2]));
            $("#latt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lat));
            $("#longt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lng));
            $("#latt2").text(JSON.stringify(data.response.venues[4].location.labeledLatLngs[0].lat));
            $("#longt2").text(JSON.stringify(data.response.venues[4].location.labeledLatLngs[0].lng));

            });

             });

            function initMap() {
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {lat: 33.8358, lng: -118.3406}
            });
            directionsDisplay.setMap(map);
    
            
            // document.getElementById('start').addEventListener('change', onChangeHandler);
            // document.getElementById('end').addEventListener('change', onChangeHandler);
            }
            function getUserLocation(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };

                 // console.log(" the inside position is "+userPosition);
                //   infoWindow.setPosition(pos);
                //   infoWindow.setContent('Location found.');
                //   infoWindow.open(map);
                //   map.setCenter(pos);
                  
                  
                }, function() {
                    getLocationFromIp();

              //    handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
             //   handleLocationError(false, infoWindow, map.getCenter());
              } 
            }

            function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
                directionsService.route({
                  //origin: document.getElementById('latt1').value +','+document.getElementById('longt1'),
                  //destination: document.getElementById('latt2').value +','+document.getElementById('longt2'),
                  origin: start,
                  destination: end,
                  
                  travelMode: 'DRIVING'
                }, function(response, status) {
                  if (status === 'OK') {
                    $("#showresult").show();
                    var result = document.getElementById('result');
                    result.innerHTML= "";
                    for (var i =0; i < response.routes[0].legs[0].steps.length; i++){
                        result.innerHTML+=response.routes[0].legs[0].steps[i].instructions+"<br>"
                    }
                    console.log(response);
                    console.log(" the distance is "+response.routes["0"].legs["0"].distance.text)
                   
            
                    $("#startAddress").text(response.routes["0"].legs["0"].start_address);
                    $("#endAddress").text(response .routes["0"].legs["0"].end_address);
                    $("#distance").text(response.routes["0"].legs["0"].distance.text);
                    $("#duration").text(response.routes["0"].legs["0"].duration.text);
                    directionsDisplay.setDirections(response);
                  } else {
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
                console.log( directionResult.routes[0].legs[0])
              }


              function getLocationFromIp(){
                $.ajax({
                    url: "http://freegeoip.net/json/",
                    method: 'GET'
                  }).then(function(data) {
                    userPosition = {
                        lat:  data.latitude,
                        lng: data.longitude
                      }; 
              }
            )}

            function getingDynamicLatAndLng(){
                

            }

         });
