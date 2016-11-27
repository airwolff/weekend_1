var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/salary_monthly';

// Employee input sent to DB
router.post('/', function (req, res) {
	var newBook = req.body;
	console.log(newBook);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'INSERT INTO monthly_salary (first_name, last_name, emp_number, job_title, yearly_salary) ' +
			'VALUES ($1, $2, $3, $4, $5)', [newEmp.first_name, newEmp.last_name, newEmp.emp_number, newEmp.job_title, newEmp.yearly_salary],
			function (err, result) {
				done();

				if (err) {
					console.log('insert query error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
	});
});

// update employee data
router.put('/:id', function (req, res) {
	empID = req.params.id;
	empPut = req.body;

	console.log('employee to update ', empPut);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'UPDATE monthly_salary SET first_name=$1, last_name=$2, emp_number=$3, job_title=$4, yearly_salary=$5' +
			' WHERE id=$7',
			// array of values to use in the query above
      [empPut.first_name, empPut.last_name, empPut.emp_number, empPut.job_title, empPut.yearly_salary, empID],
			function (err, result) {
				if (err) {
					console.log('update error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	}); // close connect
});

// delete employee data
router.delete('/:id', function (req, res) {
	empID = req.params.id;

	console.log('employee id to delete: ', empID);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM monthly_salary WHERE id = $1', [empID],
			function (err, result) {
				done();

				if (err) {
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	});
});


module.exports = router;
