// IMPORTANT: CHANGE LINE 18 to https://landmine.firebaseio.com/
var map;

var geocoder;

$(document).ready(initialize);

function initialize() {
  var mapOptions = {
    zoom:   2,
    center: {lat: 2.8, lng: -187.3},  // TODO: nice to use geo API to center on user
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
        var marker_diagnosed = 'marker_diagnosed.png';
        prepAddress(city_diagnosed,country_diagnosed,marker_diagnosed);

        var city_accident = data[entry].city_accident;
        var country_accident = data[entry].country_accident;
        var marker_accident = 'marker_accident.png';
        prepAddress(city_accident,country_accident,marker_accident);

    

    }

    // legend
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