function pushIncidentToDB(callbackFxn){
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
    var jsonData = {
        typeofreport:typeofreport,
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
        prognosis:prognosis
    };

    if (callbackFxn != undefined){
        myDataRef.push(jsonData,callbackFxn);
    }else{
        myDataRef.push(jsonData);
    }
    // console.log("volunteer form was submitted"); //here
    // myDataRef.set('Country ' + Country);
    /*document.getElementById("status").innerHTML = 'Your registration request has been submitted. We will contact you once we verify your information!'; 
    document.getElementById("submit_button").disabled = true;*/
}

