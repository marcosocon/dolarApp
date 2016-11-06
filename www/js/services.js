angular
     .module('starter.services', [])
     .factory('dataService', dataService);

angular
    .module('lodash', [])
    .factory('_', ['$window', function($window) {
      return $window._; // assumes underscore has already been loaded on the page
    }]);

 dataService.$inject = ['$http'];

 function dataService($http) {
     return {
         getData: getData
     };

     function getData() {
         return $http.get('http://ws.geeklab.com.ar/dolar/get-dolar-json.php')
             .then(getDataComplete)
             .catch(getDataFailed);

         function getDataComplete(response) {
             return response.data;
         }

         function getDataFailed(error) {
             console.log('XHR Failed for getData.' + error.data);
         }
     }
 }
