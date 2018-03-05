       
       console.log("this one is working ")
       //declaration
        var place;
        var options;
        var addressDiv;
        var dynamicStreet;
        var dynamicCity;
        var dynamiccountry;
        var outingWith;
        //for the radio button and checkbox declartion
        var valu=[];
        var radio_button_value="test";

        var withDate_R=["gym","beach"];
        var withDate_E=["theme park","spa"];
        var withDate_F=["restarunts","ice cream shop"];
        var withDate_N=["bar","music venue"];
        var withFriendsOptions=["movie theaters","bar"];
        var byYourselfOptions =["yoga","cafe"]
        //document ready function
        $(document).ready(function () {
          /* Get the checkboxes values and radio button values */


        //radio button function
        $('input[name=optradio]').click(function() {
          radio_button_value= $('input[name=optradio]:checked').val();
            console.log($('input[name=optradio]:checked').val());
            // console.log(radio_button_value);
          });
        console.log(radio_button_value);

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
          console.log("You have selected " + selected);
          return selected;	
          //alert("You have selected " + selected);	
        }else{
          alert("Please at least check one of the checkbox");	
        }
      }

         
         //create a function for radio and chcek box values
        //  $.fn.checkfunction = function(){
        //   if (radio_button_option === "Date Night"){
        //       outingWith=$('input[name=optradio]:checked').val();
        //       console.log("Yes its a date night"+ outingWith);
        //     }else if(radio_button_option === "Family"){
        //       console.log("Yes its a family outing")
        //     }else if(radio_button_option === "Friends"){
        //       console.log("Yes its a outing with friends")

        //     }else{
        //       console.log("Yes its a outing with coworkers")
        //     }

        //  }



          // Example queryURL 
          $("#add-location").click(function(){
              place=$("#locationBtn").val();
              console.log(place);
            
                valu.push(getValueUsingClass());
                $("#radioval").text(radio_button_value);
                $("#passing_array").text(valu);
   
         
         options="coffee";
          
          var queryURL = "https://api.foursquare.com/v2/venues/search?near="+place+"&query="+options+"&v=20150214&m=foursquare&client_secret=UHNKEN2CPRB5IQCW2QMA52HXPXWVKRGXKKXJS1D3KNY020U5&client_id=TE4Q21LQYROBUGJJUAPRZBBOKEPNS5LEAOBWCZ4NMS0JAULJ&limit=5";
        //query without a limit
        //   var queryURL = "https://api.foursquare.com/v2/venues/search?near="+place+"&query="+options+"&v=20150214&m=foursquare&client_secret=UHNKEN2CPRB5IQCW2QMA52HXPXWVKRGXKKXJS1D3KNY020U5&client_id=TE4Q21LQYROBUGJJUAPRZBBOKEPNS5LEAOBWCZ4NMS0JAULJ";
          console.log(options);
          console.log(place);

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
                console.log("Inside the loop"+JSON.stringify( data_venues[i].name));
            //    $("#address").append(data_venues[i].name);
                // $("#street").append(data_venues[i].location.formattedAddress[0]);
                addressDiv=$("<br><div>"+ "Name is : "+ data_venues[i].name+"</div>");
                dynamicStreet=$("<div>").text("Street is : "+data_venues[i].location.formattedAddress[0]);
                dynamicCity=$("<div>").text("City is : "+data_venues[i].location.formattedAddress[1]);
                dynamiccountry=$("<div>").text("Country  is : "+data_venues[i].location.formattedAddress[2]);
                addressDiv.append(dynamicStreet,dynamicCity,dynamiccountry);
                $("#address").append(addressDiv);
                


            }
            // console.log(data.response.venues["0"].name);
            // console.log("Inside the loop"+ data_venues[0].name);

             console.log("zip code is "+data.response.venues["0"].location.postalCode);
            // $("#street").text(JSON.stringify(data.response.venues[0].location.formattedAddress[0]));
            // $("#city").text(JSON.stringify(data.response.venues[0].location.formattedAddress[1]));
            // $("#country").text(JSON.stringify(data.response.venues[0].location.formattedAddress[2]));
           $("#latt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lat));
           $("#longt1").text(JSON.stringify(data.response.venues[0].location.labeledLatLngs[0].lng));

            });

             })
    
         });