// IMPORTANT: CHANGE LINE 18 to https://landmine.firebaseio.com/
var map;

var geocoder;

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);

  // Create a script tag and set the USGS URL as the source.
  //var script = document.createElement('script');
  //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';
  //document.getElementsByTagName('script')[0];

  $.getJSON( 
    
    "https://landmine.firebaseio.com/.json", function() {
      console.log( "success" );
    })
      .done(function( data ) {
        for (var entry in data){
          var city = data[entry].city;
          var country = data[entry].country;
          var age = data[entry].age;
          var date_injured = data[entry].age;
          var marker = 'marker_accident.png';

          // if($('#f1').is(':checked')) { 
          //   prepAddress(city,country,marker_accident, "age");
          // }else{
          //   alert("fail");
          // }


        }// legend
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].
    push(document.getElementById('legend')); 
    var label_accident = "Accident location";
    var icon_accident = 'marker_accident.png';
    var label_diagnosed = "Diagnostic location";
    var icon_diagnosed = 'marker_diagnosed.png';
    $('#legend').html('Legend'+'<br>'+
      '<img src="' + icon_accident + '"> ' + label_accident
      +'<br>'
      +'<img src="' + icon_diagnosed + '"> ' + label_diagnosed);

  });

  geocoder=new google.maps.Geocoder();

  //map styling
  var map_styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  map.setOptions({styles: map_styles});
} //end initialize()

function displayFilteredPoints_Age(first_choice,second_choice,icon_src, age){
     prepAddress(first_choice,second_choice,icon_src, age);
}

function prepAddress(first_choice,second_choice,icon_src, filter)
{
  if (first_choice=="") 
      {
        if (second_choice!="") 
        {
          if (filter == "age"){
            codeAddress(second_choice,icon_src);
          }
        }
      }
      else
      {
        codeAddress(first_choice,icon_src);
      }
}

/* Code adapted from 
https://developers.google.com/maps/documentation/javascript/geocoding */
function codeAddress(sAddress,icon_src)
{
  //var sAddress = document.getElementById("inputAddress").value;
  geocoder.geocode({ 'address':sAddress}, 
    function(results,status)
    {
    
      if(status==google.maps.GeocoderStatus.OK)
      {
        map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map:map,
          position:results[0].geometry.location,
          icon: icon_src
          //
        })
      }
      else
      {
        console.log("Geocode was not successful"); 
        //alert("Geocode was not successful for the following reason: "+status)
      }
    
    });
}
