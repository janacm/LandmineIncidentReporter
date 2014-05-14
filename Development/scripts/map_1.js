// IMPORTANT: CHANGE LINE 18 to https://landmine.firebaseio.com/
var map;

var geocoder;

$(document).ready(initialize);

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
    "https://blazing-fire-8261.firebaseio.com/.json", function() {
      //console.log( "success" );
    })
  .done(function( data ) {
    for (var i = 0; i < data.features.length; i++) {
      var coords = data.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
  });

  geocoder=new google.maps.Geocoder();

}

/* Code adapted from 
https://developers.google.com/maps/documentation/javascript/geocoding */
function codeAddress()
{
  var sAddress = document.getElementById("inputAddress").value;
  geocoder.geocode({ 'address':sAddress}, 
    function(results,status)
    {
    
      if(status==google.maps.GeocoderStatus.OK)
      {
        map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map:map,
          position:results[0].geometry.location
        })
      }
      else
      {
        alert("Geocode was not successful for the following reason: "+status)
      }
    
    });
}


// Map Styles

var myStyle = [
       {
         featureType: "administrative",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "poi",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "water",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "road",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       }
];