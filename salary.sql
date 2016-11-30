CREATE TABLE monthly_salary (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(50) UNIQUE NOT NULL,
  emp_number INTEGER NOT NULL,
  job_title VARCHAR (100) NOT NULL,
  yearly_salary INTEGER NOT NULL
);

DROP TABLE monthly_salary;
