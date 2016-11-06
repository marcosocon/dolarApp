angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, dataService) {
	var self = this;
	self.loading = false;
	self.labels = ["0", "1", "2", "3", "4", "5"];
	self.series = ['Dolar Blue', 'Dolar Oficial'];
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
	self.datablue = localStorage.getItem("dollarDataBlue") ? JSON.parse(localStorage.getItem("dollarDataBlue")) : [];
	self.dataoficial = localStorage.getItem("dollarDataOficial") ? JSON.parse(localStorage.getItem("dollarDataOficial")) : [];

	self.init = function(){
		self.loading = true;
		return dataService.getData()
		.then(function(data) {
			self.dollarInfo = data;
			self.loading = false;
			self.datablue.push(data.blue);
			self.dataoficial.push(data.libre);
			self.setDolarData('dollarDataBlue', self.datablue);
			self.setDolarData('dollarDataOficial', self.dataoficial);
			self.data = (localStorage.getItem("dollarDataBlue") && localStorage.getItem("dollarDataOficial")) ? [JSON.parse(localStorage.getItem("dollarDataBlue")), JSON.parse(localStorage.getItem("dollarDataOficial"))] : [];
			return self.dolarInfo;
		});
	};

	self.setDolarData = function(dolarTypeKey, dolarArray){
		if (!localStorage.getItem(dolarTypeKey)) {
			localStorage.setItem(dolarTypeKey, JSON.stringify(dolarArray));
		}
		if (JSON.parse(localStorage.getItem(dolarTypeKey)).length >= 6) {
			dolarArray.shift();
			localStorage.setItem(dolarTypeKey, JSON.stringify(dolarArray));
		} else {
			localStorage.setItem(dolarTypeKey, JSON.stringify(dolarArray));
		}
	};
	self.init();

})

.controller('ActivityCtrl', function($ionicPopup) {
    var self = this;
    self.moves = [];

    self.addPlusMove = function(){
        $ionicPopup.prompt({
            title:"Nueva Tarea",
            inputPlaceholder: "Que tienes que hacer?",
            okText: "Crear!"
        });
    };

    self.remove = function(move){
        self.moves.splice(move.$index, 1);
    };
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
