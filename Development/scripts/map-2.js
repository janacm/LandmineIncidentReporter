// IMPORTANT: CHANGE LINE 18 to https://landmine.firebaseio.com/
var map;

var geocoder;

$(document).ready(initialize);

function initialize() {
  var mapOptions = {
    zoom:   2,
    center: {lat: 25, lng: 10},  // TODO: nice to use geo API to center on user
    overviewMapControl: false,
    streetViewControl:  false,
    mapTypeControl:     false,
    mapTypeId:          google.maps.MapTypeId.SATELLITE,
    panControl:         true,
    rotateControl:      false,
    scaleControl:       false,
    scrollwheel:        false,
    zoomControl:        true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL}
    //styles: [MAGIC]  Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain modes, these styles will only apply to labels and geometry.
    // SEE: https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapTypeStyle
    // SEE: https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapTypeStyleElementType
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);
  
  var centerListenter = google.maps.event.addListener(map, 'center_changed', checkBounds);
  
  
  //when zoom == 2,  use lat = -35/35
  //when zoom == 3,  use lat = -73.3/73.3
  //when zoom == 5,  use lat = -83.3/83.3
  //when zoom == 7,  use lat = -84.6/84.6
  var max_center_lat = 35;
  var allowedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-max_center_lat, -180),
    new google.maps.LatLng( max_center_lat,  180));
  //new google.maps.Rectangle({map: map}).setBounds(allowedBounds);

  function checkBounds() {
    if (centerListenter)
      google.maps.event.removeListener(centerListenter);
//     console.log(map.getCenter().lat());
//     console.log(map.getCenter().lng());
    if( !allowedBounds.contains(map.getCenter()) ) {
      var mapCenter = map.getCenter();
      var c_lat = mapCenter.lat();
      var c_lng = mapCenter.lng();
      var new_lat = ( c_lat >= 0 ? max_center_lat : -max_center_lat );
      var new_lng = c_lng;  //just move vertically
      map.setCenter(new google.maps.LatLng(new_lat,new_lng));
    }
    centerListenter = google.maps.event.addListener(map, 'center_changed', checkBounds);
  }
  
  
  // Create a script tag and set the USGS URL as the source.
  //var script = document.createElement('script');
  //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';
  //document.getElementsByTagName('script')[0];

  $.getJSON( 
    "https://landmine.firebaseio.com/.json", function() {
      console.log( "success" );
    })
  .done(function( data ) {

    for (var entry in data) 
    {  // need to get index of an element (i.e. json[0] is undefined)

        var city_diagnosed = data[entry].city_diagnosed;
        var country_diagnosed = data[entry].country_diagnosed;
        var marker_diagnosed = 'images/marker_diagnosed.png';
        prepAddress(city_diagnosed,country_diagnosed,marker_diagnosed);

        var city_accident = data[entry].city_accident;
        var country_accident = data[entry].country_accident;
        var marker_accident = 'images/marker_accident.png';
        prepAddress(city_accident,country_accident,marker_accident);

    

    }

    // legend
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].
    push(document.getElementById('legend')); 
    var label_accident = "Accident location";
    var icon_accident = 'images/marker_accident.png';
    var label_diagnosed = "Diagnostic location";
    var icon_diagnosed = 'images/marker_diagnosed.png';
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


}

function prepAddress(first_choice,second_choice,icon_src)
{
  if (first_choice=="") 
  {
    if (second_choice!="") 
    {
      codeAddress(second_choice,icon_src);
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
        //map.setCenter(results[0].geometry.location);

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