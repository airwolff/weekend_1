var salaryApp = angular.module("salaryApp", ['ngRoute']);

// templates and controllers
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/emp' ,{
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



















$(document).ready(function () {
	var array = [];

	var totalEmployeeSalaryExpenditure = 0;

	$('#monthlyExpenditure').append('  $' + totalEmployeeSalaryExpenditure + ' per month.');

	$('#employeeInfo').on('submit', function (event) {

		event.preventDefault();

		// initialize a new variable as an empty object
		var employeeData = {};

		// convert the form inputs into an array
		var fields = $('#employeeInfo').serializeArray();




		console.log(fields)
			// iterate over the array and transfer each index into a new property on an object with the value of what was entered.
		fields.forEach(function (element, index, array) {
			employeeData[element.name] = element.value;
		});

		console.log(employeeData);

		// clear out inputs
		$('#employeeInfo').find('input', '').val('');

		// appends to DOM on submit event
		appendDom(employeeData);

		// updates the monthly expenditures as employees are entered
		totalEmployeeSalaryExpenditure = totalMonthlySalary(employeeData, totalEmployeeSalaryExpenditure);
		console.log(totalEmployeeSalaryExpenditure);

		// Updates page with total monthly salary expenditures
		$('#monthlyExpenditure').empty();
		$('#monthlyExpenditure').append('  $' + Math.round(totalEmployeeSalaryExpenditure) + ' per month.');
	});

	//function that targets div id employee table. Appends div person to table and creates var of each person to insert

	function appendDom(empInfo) {
		$('#employeeTable').append('<div class="person"></div>');
		var $individualEmployeeDetails = $('#employeeTable').children().last();

		// function remove data
		// $('#delete').remove()

		//append table data for each employee entered

		$individualEmployeeDetails.append(
			'<tr>' +
			'<td>' + empInfo.employeeFirstName + '</td>' +
			'<td>' + empInfo.employeeLastName + '</td>' +
			'<td>' + empInfo.empNumber + '</td>' +
			'<td>' + empInfo.jobTitle + '</td>' +
			'<td>' + empInfo.yearlySalary + '</td>' +
			'<td><button id="delete">Delete</button>' +
			'</tr>'
		);
		// alternates the color of table rows
		$('#employeeTable').find('tr:even').css({
			'background-color': '#95A5A6'
		}).end().find('tr:odd').css({
			'background-color': '#ECF0F1'
		});
	}

	//function to add yearly salaries of all employees together and return total of those salaries monthly
	function totalMonthlySalary(empNumbers, prevMonthly) {
		var annual = empNumbers.yearlySalary;
		var monthly = annual / 12;
		var total = monthly + prevMonthly;
		total = total;
		return total;
	}
});
