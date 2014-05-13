function pushIncidentToDB(){
    var myDataRef = new Firebase('https://landmine.firebaseio.com/');
    var typeofreport = "medical";
    var city_accident = $("#city_a").val();
    var city_diagnosed = $("#city_d").val();
    var date_injured = $("#dateInjured").val();
    var date_diagnosed = $("#dateDiagnosed").val();

    var age = $("#age").val();
    var gender = $("#gender").val();
    var type = $("#typeofexplosive").val();
    var injury = $("#injury").val();
    var treatment = $("#prognosis").val();
    
    var country_accident = $('#country_a').val();
    var country_diagnosed = $('#country_d').val();

    myDataRef.push({
        typeofreport:typeofreport
        city_accident:city_accident, 
        country_accident:country_accident, 
        city_diagnosed:city_diagnosed, 
        country_diagnosed:country_diagnosed, 
        date_injured:date_injured, 
        date_diagnosed:date_diagnosed, 
        age:age,
        gender:gender,
        type:type, 
        injury:injury, 
        treatment:treatment
    });
    console.log("medical form was submitted"); //here
    // myDataRef.set('Country ' + Country);
}