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
  //  https://shining-fire-2988.firebaseio.com/.json
  //  https://landmine.firebaseio.com/.json

  filterMap();

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

//grabs JSON file and loops through each entry
function filterMap()
{
  $.getJSON( 
    "https://shining-fire-2988.firebaseio.com/.json", function() {
      console.log( "success" );
    })
  .done(function( data ) {

    var current_time = new Date();

    var current_year = current_time.getFullYear();

    for (var entry in data) 
    {  // need to get index of an element (i.e. json[0] is undefined)


      var age = parseInt(data[entry].age);

// the date problem is being investigated -- the following currently doesn't fetch the year
// we just need to fetch the year
      var date_inp=data[entry].date_injured;
      var date_injured2 = new Date(date_inp);
      var date_injured= date_injured2.getFullYear();

      date_injured=2014; // debug hack
// end of date fetching

      //var age_lb=$('#ageSlider').slider('getValue');
      var age_limits=$('#ageSlider').data('slider').getValue();
      var age_lb=age_limits[0];
      var age_ub=age_limits[1];

      //var age_lb=19; //lower decision boundary on age
      //var age_ub=21; //upper decision boundary on age
      
      var date_limits=$('#dateSlider').data('slider').getValue();
      var date_lb=date_limits[0];
      var date_ub=date_limits[1];
      //var date_lb=2000; //lower decision boundary on age
      //var date_ub=2014;//upper decision boundary on age

      // 1) The ith element of data_status indicates whether the current data
      // entry (the current report) satisfies the range specified by ith slider
      // 2) We have the age slider in element 0, and the date slider in element 1
      var data_status = [ (age>=age_lb) && (age <= age_ub),
                          (date_injured>= date_lb ) && (date_injured<=date_ub)];


      // check input
      if( (age=="") || (age<0 )|| (age>150))
      {
        data_status[0]=false;
      }


      if( (date_injured=="") || (date_injured< 1900) || (date_injured > current_year))
      {
        data_status[1]=false;
      }

      data_status[1]=true;//debug only
      var plot_flag=true;
      for (var i = 0; i < data_status.length; i++) 
      { 
        plot_flag=plot_flag && data_status[i];
      }

      // Try to geocode and place marker if it passed the filters
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