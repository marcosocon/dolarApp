angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, dataService) {
      var self = this;
      self.labels = ["Lunes", "Martes", "Miercoles", "Jueves", "Sabado", "Domingo"];
      self.series = ['Series A'];
      self.data = [15, 15.20 , 15.14, 15.26 , 15.30 , 15.40 ];

      init();

      function init() {
        return dataService.getData()
        .then(function(data) {
          self.dolarInfo = data;
          return self.dolarInfo;
        });
      }

})

.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
