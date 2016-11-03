angular
     .module('starter.services', [])
     .factory('dataService', dataService);

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
