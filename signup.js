angular.module("SignUp", [])
  .factory("ChatService", function() {
    var ref = new Firebase("https://<my-firebase>.firebaseio.com/chat");
    return {
      getMessages: function() {
        var messages = [];
        ref.on("child_added", function(snapshot) {
          messages.push(snapshot.val());
        });
        return messages;
      },
      addMessage: function(message) {
        ref.push(message);
      }
    }
  })
  .controller("SignUpController", ["$scope", "ChatService",
    function($scope, service) {
      $scope.user = "Guest " + Math.round(Math.random()*101);
      $scope.messages = service.getMessages();
      $scope.addMessage = function() {
        service.addMessage({from: $scope.user, content: $scope.message});
        $scope.message = "";
      };
    }
  ]);