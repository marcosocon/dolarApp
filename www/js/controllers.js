angular.module('starter.controllers', ['lodash'])

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

.controller('ActivityCtrl', function($scope , $ionicModal, $ionicPopup) {
	$scope.moves = localStorage.getItem("moves") ? JSON.parse(localStorage.getItem("moves")) : [];
	$scope.newMove = {};

	$scope.addMove = function(newMove){
		if (newMove && _.isNumber(newMove.amount) && newMove.currency && newMove.type) {
			$scope.moves.push(newMove);
			$scope.closeModal();
			localStorage.setItem("moves", JSON.stringify($scope.moves));
			$scope.getPesosBalance();
			$scope.getDollarsBalance();
			$scope.getTotalBalance();
		} else {
			$ionicPopup.alert({
				title: 'Error',
				template: 'Por favor complete los campos.'
			});
			return false;
		}
	};

	$scope.getPesosBalance = function(){
		$scope.totalPesosIncome = 0;
		$scope.totalPesosOutcome = 0;
		var moneyPlus = _.filter($scope.moves, {'type': 'Ingreso', 'currency': 'Pesos'});
		_.forEach(moneyPlus, function(move){
			$scope.totalPesosIncome += move.amount;
		});
		var moneyMinus = _.filter($scope.moves, {'type': 'Egreso', 'currency': 'Pesos'});
		_.forEach(moneyMinus, function(move){
			$scope.totalPesosOutcome += move.amount;
		});
		$scope.totalPesosBalance = 	$scope.totalPesosIncome - $scope.totalPesosOutcome;
	};

	$scope.getDollarsBalance = function(){
		$scope.totalDollarsIncome = 0;
		$scope.totalDollarsOutcome = 0;
		if(localStorage.getItem("dollarDataBlue")){
			var dollarDataArray = JSON.parse(localStorage.getItem("dollarDataBlue"));
			$scope.lastDollar = parseFloat(dollarDataArray[dollarDataArray.length - 1]);
		}
		var moneyPlus = _.filter($scope.moves, {'type': 'Ingreso', 'currency': 'Dolares'});
		_.forEach(moneyPlus, function(move){
			$scope.totalDollarsIncome += move.amount;
		});
		var moneyMinus = _.filter($scope.moves, {'type': 'Egreso', 'currency': 'Dolares'});
		_.forEach(moneyMinus, function(move){
			$scope.totalDollarsOutcome += move.amount;
		});
		$scope.totalDollarBalance = $scope.totalDollarsIncome - $scope.totalDollarsOutcome;
	};

	$scope.getTotalBalance = function(){
		if (_.isNumber($scope.totalPesosBalance) && _.isNumber($scope.totalDollarBalance) && $scope.lastDollar) {
			$scope.totalEarning = ($scope.totalPesosBalance + ($scope.totalDollarBalance * $scope.lastDollar));
		}
	};

	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.newMove = {};
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	$scope.remove = function(move){
		removeByAttr($scope.moves, '$$hashKey', move.$$hashKey);
		localStorage.setItem("moves", JSON.stringify($scope.moves));
		$scope.getPesosBalance();
		$scope.getDollarsBalance();
		$scope.getTotalBalance();
	};

	$scope.getPesosBalance();
	$scope.getDollarsBalance();
	$scope.getTotalBalance();
	var removeByAttr = function(arr, attr, value){
		var i = arr.length;
		while(i--){
			if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value ) ){
				arr.splice(i,1);
			}
		}
		return arr;
	};
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

})

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope, $ionicHistory, $ionicPopup) {
	$scope.clearData = function(){
		$ionicPopup.confirm({
			title: 'Estás seguro?',
			template: 'Esta accion borrará todos los datos almacenados.'
		}).then(function(res) {
			if(res) {
				localStorage.clear();
				$ionicHistory.clearCache();
				$ionicHistory.clearHistory();
			} else {
				return false;
			}
		});
	};

	$scope.settings = {
		enableFriends: true
	};
});
