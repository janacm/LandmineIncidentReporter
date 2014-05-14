function pushIncidentToDB(callbackFxn){
  
  var myDataRef = new Firebase('https://landmine.firebaseio.com/');
  
  var type_of_report    = "medical";
  var city_accident     = $("#city_a").val();
  var city_diagnosed    = $("#city_d").val();
  var country_accident  = $('#country_a').val();
  var country_diagnosed = $('#country_d').val();
  var date_injured      = $("#dateInjured").val();
  var date_diagnosed    = $("#dateDiagnosed").val();
  
  var age       = $("#age").val();
  var gender    = $("#gender").val();
  var type      = $("#typeofexplosive").val();
  var injury    = $("#injury").val();
  var treatment = $("#treatment").val();
  
  
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
  
  if (callbackFxn != undefined)
    myDataRef.push(jsonData,callbackFxn);
  else
    myDataRef.push(jsonData);
}