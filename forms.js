$(document).ready(function() {
    var array = [];
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      // initialize a new variable as an empty object
      var values = {};

      // convert the form inputs into an array
      var fields = $('#employeeinfo').serializeArray();

      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element, index, array) {
        // review index notation vs. dot notation on objects
        // here, dot notation wouldn't work
        values[element.name] = element.value;
      });



      console.log(values);

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');

      // appends to DOM on submit event
      appendDom(values);

      salaryMath(values);
      console.log(salaryMath(values));
    });

    //function that targets div id employee table. Appends div person to table and creates var of each person to insert

    function appendDom(empInfo) {
      $('#employeeTable').append('<div class="person"></div>');
      var $individualEmployeeDetails = $('#employeeTable').children().last();

      //append table data for each employee entered

      $individualEmployeeDetails.append(
        '<tr>' +
        '<td>' + empInfo.employeeFirstName + '</td>' +
        '<td>' + empInfo.employeeLastName + '</td>' +
        '<td>' + empInfo.empNumber + '</td>' +
        '<td>' + empInfo.jobTitle + '</td>' +
        '<td>' + empInfo.yearlySalary + '</td>' +
        '</tr>'
      );
    }



    var monthlySalary = null;

      var salaryMath = function(empSalary) {
        $prevSalary = $('#monthlyExpend').val();
        parseInt($prevSalary);
        $prevSalary += empSalary.yearlySalary;
        return $prevSalary;
      };


    //function to add yearly salaries of all employees together and return total of those salaries monthly
    function totalMonthlySalary(empNumbers) {
      $('#monthlyExpenditure').append('<div id="monthlyNumbers"></div>');
      var $totalMonthly = $('#monthlyExpend').replaceWith()
    }
  });
