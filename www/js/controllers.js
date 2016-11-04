angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, dataService) {
	var self = this;
	self.loading = false;
	self.labels = ["0", "1", "2", "3", "4", "5"];
	self.series = ['Series A'];
	self.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}
			]
		}
	};
	self.data = localStorage.getItem("dollarData") ? JSON.parse(localStorage.getItem("dollarData")) : [];

	self.init = function(){
		self.loading = true;
		return dataService.getData()
		.then(function(data) {
			self.dollarInfo = data;
			self.loading = false;
			self.data.push(data.blue);
			if (!localStorage.getItem("dollarData")) {
				localStorage.setItem("dollarData", JSON.stringify(self.data));
			}
			if (JSON.parse(localStorage.getItem("dollarData")).length >= 6) {
				self.data.shift();
				localStorage.setItem("dollarData", JSON.stringify(self.data));
			} else {
				localStorage.setItem("dollarData", JSON.stringify(self.data));
			}
			return self.dolarInfo;
		});
	};
	self.init();

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
