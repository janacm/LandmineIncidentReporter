function pushIncidentToDB(){
    var myDataRef = new Firebase('https://landmine.firebaseio.com/');
    var typeofreport = "volunteer";
    var city_accident = $("#city_a").val();
    var city_diagnosed = $("#city_d").val();
    var date_injured = $("#dateInjured").val();
    var date_diagnosed = $("#dateDiagnosed").val();

    var age = $("#age").val();
    var gender = $("#gender").val();
    var type = $("#typeofexplosive").val();
    var injury = $("#injury").val();
    var prognosis = $("#prognosis").val();
    
    var country_accident = $('#country_a').val();
    var country_diagnosed = $('#country_d').val();

    console.log("works1"); //here
    // myDataRef.push({country:" country"});
    myDataRef.push({city:city, country:country, city:city, date:date, age:age, gender:gender, type:type, injury:injury, treatment:treatment, nameofvictim:nameofvictim});
    console.log("works2"); //here
    // myDataRef.set('Country ' + Country);
}