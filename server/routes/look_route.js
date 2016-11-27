var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigmanuts';


router.get('/', function (req, res) {
	console.log('message on REC: ', req.message);
	// get books from DB
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT * FROM books', function (err, result) {
			done(); // close the connection.

			// console.log('the client!:', client);

			if (err) {
				console.log('select query error: ', err);
				res.sendStatus(500);
			}
			res.send(result.rows);

		});

	});
});

router.post('/', function (req, res) {
	var newBook = req.body;
	console.log(newBook);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'INSERT INTO books (title, author, published, genre, edition, publisher) ' +
			'VALUES ($1, $2, $3, $4, $5, $6)', [newBook.title, newBook.author, newBook.published, newBook.genre, newBook.edition, newBook.publisher],
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

router.delete('/:id', function (req, res) {
	bookID = req.params.id;

	console.log('book id to delete: ', bookID);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM books WHERE id = $1', [bookID],
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

router.put('/:id', function (req, res) {
	bookID = req.params.id;
	book = req.body;

	console.log('book to update ', book);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'UPDATE books SET title=$1, author=$2, genre=$3, published=$4, edition=$5, publisher=$6' +
			' WHERE id=$7',
			// array of values to use in the query above
      [book.title, book.author, book.genre, book.published, book.edition, book.publisher, bookID],
			function (err, result) {
				if (err) {
					console.log('update error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	}); // close connect

}); // end route


module.exports = router;


var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
	database: 'sigma',
};
var pool = new pg.Pool(config);
router.get('/', function (req, res) {
	pool.connect()
		.then(function (client) {
			client.query('SELECT * FROM tasks ORDER BY completed')
				.then(function (result) {
					client.release();
					res.send(result.rows);
				});
		})
		.catch(function (err) {
			console.log('error on SELECT', err);
			res.sendStatus(500);
		});
});
router.post('/', function (req, res) {
	var task = req.body;
	pool.connect()
		.then(function (client) {
			client.query('INSERT INTO tasks(description) VALUES($1)', [task.description])
				.then(function () {
					client.release();
					res.sendStatus(201);
				});
		})
		.catch(function (err) {
			res.sendStatus(500);
		});
});
router.patch('/:id', function (req, res) {
	var task = req.body;
	var taskId = req.params.id;
	pool.connect()
		.then(function (client) {
			client.query('UPDATE tasks ' +
					'SET completed = $1 ' +
					'WHERE id = $2', [task.completed, taskId])
				.then(function () {
					client.release();
					res.sendStatus(204);
				});
		})
		.catch(function (err) {
			res.sendStatus(500);
		});
});
router.delete('/:id', function (req, res) {
	var taskId = req.params.id;
	pool.connect()
		.then(function (client) {
			client.query('DELETE FROM tasks ' +
					'WHERE id = $1', [taskId])
				.then(function () {
					client.release();
					res.sendStatus(204);
				});
		})
		.catch(function (err) {
			res.sendStatus(500);
		});
});
module.exports = router;
