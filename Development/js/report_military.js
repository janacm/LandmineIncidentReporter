function pushIncidentToDB(){
    var myDataRef = new Firebase('https://landmine.firebaseio.com/');
    var typeofreport = "military";
    var GPS_lat = $("#GPS_lat").val();
    var GPS_lng = $("#GPS_lng").val();

    var city_accident = $("#city_a").val();
    var date_injured = $("#dateInjured").val();
    var age = $("#age").val();
    var gender = $("#gender").val();
    var type = $("#typeofexplosive").val();
    var injury = $("#injury").val();
    var treatment = $("#prognosis").val();
    
    var country_accident = $('#country_a').val();

    console.log("works1"); //here
    // myDataRef.push({country:" country"});
    myDataRef.push({
        typeofreport:typeofreport
        city_accident:city_accident, 
        country_accident:country_accident, 
        date_injured:date_injured, 
        age:age,
        gender:gender,
        type:type, 
        injury:injury, 
        treatment:treatment
    });

    });
    console.log("military form was submitted"); //here
    // myDataRef.set('Country ' + Country);
}