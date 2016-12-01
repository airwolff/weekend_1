salaryApp.controller('InputController', ["$http", function ($http) {
	console.log('employee input controller running');
	var self = this;
	self.newEmp = {};
	self.employees = [];
	getEmps();

	self.addEmp = function () {
		console.log('new employee: ', self.newEmp);
		$http.post('/salary_input', self.newEmp)
			.then(function (response) {
				console.log('POST finished. Get employees again.');
				getEmps();
			});
	};

	// get employee to edit if needed
	function getEmps() {
		$http.get('/salary_input')
			.then(function (response) {
				console.log('Employee Data Get ' + response);
				self.employees = response.data;
			});
	}

	// delete employee
	self.deleteEmp = function (empObj) {
		$http.delete('/salary_input/' + empObj.id)
			.then(function (response) {
				console.log('DELETE finished. Get employees again.');
				getEmps();
			});
	};

	// edit employees
	self.editEmp = function (empObj) {
		$http.put('/salary_input/' + empObj.id, empObj)
			.then(function (response) {
				console.log('Edited ' + empObj);
				getEmps();
			});
	};
}]);
