

var dataBase = new Firebase('https://workingtitle.firebaseio.com');

var auth = new FirebaseSimpleLogin(dataBase, function(error, user) {
    console.log('err: ' + error);
    console.log('user: ' + user);

  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log('User Name: ' + user.uid + ', Provider: ' + user.provider);
  } else {
    // user is logged out
    console.log('logedout');
  }
});
  
  
console.log(dataBase);