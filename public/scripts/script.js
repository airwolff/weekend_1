var salaryApp = angular.module('salaryApp', ['ngRoute']);

// templates and controllers
salaryApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/input', {
			templateUrl: '../views/templates/input.html',
			controller: 'InputController',
			controllerAs: 'input'
		})
		.when('/output', {
			templateUrl: '../views/templates/output.html',
			controller: 'OutputController',
			controllerAs: 'output'
		})
		.otherwise({
			redirectTo: 'input'
		});
}]);

var totalEmployeeSalaryExpenditure = 0;
