function addTicket() 
{
  /*var tusername = document.getElementById("username");
  var tpassword = document.getElementById("password");
  var tchk = document.getElementById("retyped password");
  var tinstitution = document.getElementById("institution name");
  var taddress = document.getElementById("address");
  var tphone = document.getElementById("phone");*/

  var tusername = $("#username").val();
  var tpassword = $("#password").val();
  var tchk = $("#retyped_password").val();
  var tinstitution = $("#institution_name").val();
  var taddress = $("#address").val();
  var tphone = $("#phone").val();

  if (tpassword==tchk) 
  {
    var ticketDB = new Firebase(" https://landmine.firebaseio.com/");
    ticketDB.push({ username: tusername,password: tpassword, institution: tinstitution, address: taddress, phone: tphone});
    //ticketDB.set({ username: ttusername });

    document.getElementById("status").innerHTML = 'Your registration request has been submitted. We will contact you once we verify your information!'; 
    document.getElementById("submit_button").disabled = true;
  } else 
  {
  
    document.getElementById("status").innerHTML = 'The re-typed password did not match the password!';
  }
}