// IMPORTANT: CHANGE LINE 18 to https://landmine.firebaseio.com/
var map;

var geocoder;

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: google.maps.MapTypeId.SATELLITE 
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);

  // Create a script tag and set the USGS URL as the source.
  //var script = document.createElement('script');
  //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';
  //document.getElementsByTagName('script')[0];

  $.getJSON( 
    "https://shining-fire-2988.firebaseio.com/.json", function() {
      console.log( "success" );
    })
  .done(function( data ) {

    for (var entry in data) 
    {  // need to get index of an element (i.e. json[0] is undefined)

      
/*
      var date_injured = data[entry].date_injured;
*/
      // filter
      var age = data[entry].age;


      var date_injured = data[entry].date_injured;

      var age_lb=24; //lower decision boundary on age
      var age_ub=59; //upper decision boundary on age
      var date_lb=2000; //lower decision boundary on age
      var date_ub=2010; //upper decision boundary on age

      var chk_box_status = [true,true,false,false,false,true]; //debug

      var data_status = [age< age_lb, 
                        true,
                        age> age_ub,
                        date_injured< date_lb,
                        true,
                        date_injured> date_lb];
      data_status[1]=!(data_status[0]||data_status[2]);
      data_status[4]=!(data_status[3]||data_status[5]);

      // check input
      if(age=="" || age<0 || age>150)
      {
        data_status[0]=false;
        data_status[1]=false;
        data_status[2]=false;
      }
      if(date_injured=="" || date_injured<1950 || date_injured>2014)
      {
        data_status[5]=false;
        data_status[4]=false;
        data_status[3]=false;
      }

      var plot_flag=true;
      for (var i = 0; i < data_status.length; i++) 
      { 
          var temp=applySubFilter(chk_box_status[i], data_status[i]);
          plot_flag=plot_flag && temp;
      }
  
      if (plot_flag==true) 
      {
        var city_diagnosed = data[entry].city_diagnosed;
        var country_diagnosed = data[entry].country_diagnosed;
        var marker_diagnosed = 'marker_diagnosed.png';
        prepAddress(city_diagnosed,country_diagnosed,marker_diagnosed);

        var city_accident = data[entry].city_accident;
        var country_accident = data[entry].country_accident;
        var marker_accident = 'marker_accident.png';
        prepAddress(city_accident,country_accident,marker_accident);
      }
      

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

function applySubFilter(chk_box_status, data_status)
{
  var output=true;
  if(chk_box_status == true)
  {
    output=data_status;
  }
  return output;
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