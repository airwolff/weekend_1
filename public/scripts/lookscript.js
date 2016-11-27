var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/warehouse' ,{
      templateUrl: '/views/templates/warehouse.html',
      controller: 'WarehouseController',
      controllerAs: 'warehouse'
    })
    .when('/customers' ,{
      templateUrl: '/views/templates/customers.html',
      controller: 'CustomersController',
      controllerAs: 'customers'
    })
    .when('/orders' ,{
      templateUrl: '/views/templates/orders.html',
      controller: 'OrdersController',
      controllerAs: 'orders'
    })
    .otherwise({
      redirectTo: 'home'

    });
}]);

app.controller('HomeController', function() {
  console.log('home controller running');
  var self = this;
  self.message = "Home controller is the best!";

});

//warehouse controller
app.controller('WarehouseController',["$http", function($http) {
  console.log('warehouse controller running');
  var self = this;
  self.message = "Warehouse controller is the best!";
  self.warehouses = [];
    getWarehouse();
//get request for warehouse data
  function getWarehouse() {
    $http.get('routes/warehouse')
    .then(function(response){
      self.warehouses = response.data;
      console.log("warehouse data", self.warehouses);
    });
  }

}]);//end warehouse controller

app.controller('CustomersController',["$http", function($http){
  console.log('customer controller running');
  var self = this;
  self.customers = [];
  getCustomer();
  //request to get customer data
  function getCustomer() {
    $http.get('routes/customers')
    .then(function(response){
      self.customers = response.data;
      console.log("customer data", self.customers);
    });
  }

}]);

app.controller('OrdersController',["$http", function($http) {
  console.log('orders controller running');
  var self = this;
  self.orders = [];
  getOrders();
  function getOrders() {
    $http.get('routes/orders')
    .then(function(response){
      self.orders = response.data;
      console.log("orders data", self.orders);
    });
  }


}]);
