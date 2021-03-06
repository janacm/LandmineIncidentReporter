function pushIncidentToDB(callbackFxn){
  
  var myDataRef = new Firebase('https://landmine.firebaseio.com/');
  
  var type_of_report   = "military";
  var GPS_lat          = $("#GPS_lat").val();
  var GPS_lng          = $("#GPS_lng").val();
  var city_accident    = $("#city_a").val();
  var country_accident = $('#country_a').val();
  var date_injured     = $("#dateInjured").val();
  
  var age    = $("#age").val();
  var gender = $("#gender").val();
  var type   = $("#typeofexplosive").val();
  var injury = $("#injury").val();
  

  var jsonData = {'type_of_report':    type_of_report,
                  'city_accident':     city_accident,
                  'country_accident':  country_accident,
                  'city_diagnosed':    city_diagnosed,
                  'country_diagnosed': country_diagnosed,
                  'date_injured':      date_injured,
                  'date_diagnosed':    date_diagnosed, 
                  'age':               age,
                  'gender':            gender,
                  'type':              type, 
                  'injury':            injury, 
                  'treatment':         treatment
  };
      typeofreport:typeofreport,
      city_accident:city_accident, 
      country_accident:country_accident, 
      date_injured:date_injured, 
      age:age,
      gender:gender,
      type:type, 
      injury:injury, 
  };

  if (callbackFxn != undefined)
    myDataRef.push(jsonData,callbackFxn);
  else
    myDataRef.push(jsonData);
}