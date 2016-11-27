var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', function () {
	console.log('home controller running');
	var self = this;
	self.message = "Home controller is the best!";

});

//warehouse controller
app.controller('WarehouseController', ["$http", function ($http) {
	console.log('warehouse controller running');
	var self = this;
	self.message = "Warehouse controller is the best!";
	self.warehouses = [];
	getWarehouse();
	//get request for warehouse data
	function getWarehouse() {
		$http.get('routes/warehouse')
			.then(function (response) {
				self.warehouses = response.data;
				console.log("warehouse data", self.warehouses);
			});
	}

}]); //end warehouse controller

app.controller('CustomersController', ["$http", function ($http) {
	console.log('customer controller running');
	var self = this;
	self.customers = [];
	getCustomer();
	//request to get customer data
	function getCustomer() {
		$http.get('routes/customers')
			.then(function (response) {
				self.customers = response.data;
				console.log("customer data", self.customers);
			});
	}

}]);

app.controller('OrdersController', ["$http", function ($http) {
	console.log('orders controller running');
	var self = this;
	self.orders = [];
	getOrders();

	function getOrders() {
		$http.get('routes/orders')
			.then(function (response) {
				self.orders = response.data;
				console.log("orders data", self.orders);
			});
	}


}]);


myApp.controller("BookController", ["$http", function ($http) {
	console.log('running');
	var self = this;
	self.newBook = {};
	self.books = [];
	getBooks();
	// read only
	function getBooks() {
		$http.get('/books')
			.then(function (response) {
				console.log(response.data);
				self.books = response.data;
			});
	}
	// tied to DOM thru self object
	self.addBook = function () {
		console.log('new book: ', self.newBook);
		$http.post('/books', self.newBook)
			.then(function (response) {
				console.log('POST finished. Get books again.');
				getBooks();
			});
	};
	self.deleteMe = function (bookObj) {
		console.log('delete', bookObj);
		$http.delete('/books/' + bookObj.id)
			.then(function (response) {
				console.log('DELETE finished. Get books again.');
				getBooks();
			});
	};
	self.editMe = function (bookObj) {
		$http.put('/books/' + bookObj.id, bookObj)
			.then(function (response) {
				console.log('Edited');
				getBooks();
			});
	};
}]);
