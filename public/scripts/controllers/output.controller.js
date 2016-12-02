// expenditure output for table
salaryApp.controller('OutputController', ["$http", function ($http) {
	// console.log('expenditure output controller running');
	var self = this;
	getEmps();
	self.employees = [];
	self.totalSalary = 0.00;

	function calcSalary() {
		self.totalSalary = 0.00;
		self.employees.forEach(function (employee) {
			self.yearly_salary = Math.round(employee.yearly_salary / 12);
		});
	}

	function getEmps() {
		$http.get('/salary_output')
			.then(function (response) {
				self.employees = response.data;
				calcSalary();
			});
	}
}]);
