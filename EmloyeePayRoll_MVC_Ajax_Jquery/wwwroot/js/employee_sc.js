
$(document).ready(function () {
    /*alert('ok');*/

    ShowEmployees();
})

function ShowEmployees() {
    debugger
    $.ajax({
        url: '/Employee/GeAllEmployees',
        type: 'Get',
        dataType: 'Json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.employeeId + '</td>'
                object += '<td>' + item.employeeName + '</td>'
                object += '<td>' + item.email + '</td>'
                object += '<td>' + item.profileImage + '</td>'
                object += '<td>' + item.gender + '</td>'
                object += '<td>' + item.department + '</td>'
                object += '<td>' + item.salary + '</td>'
                object += '<td>' + item.hireDate + '</td>'
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.employeeId +')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.employeeId + ')">Delete </a> </td>'
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("data can't get");
        }
    });
};

$('#btnAddEmployee').click(function () {
    $('#EmployeeModal').modal('show');
    ClearTextBox();
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#EmployeeHeading').text("Add Employee");
})

function AddEmployee() {
    debugger
    var objData = {
        employeeName: $('#EmployeeName').val(),
        Email: $('#Email').val(),
        ProfileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        HireDate: $('#HireDate').val()
    }
    $.ajax({
        url: '/Employee/AddEmployee/',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('Employee data Saved');
            ShowEmployees();
            HideModalPopUp();
            ClearTextBox();
        },
        error: function () {
            alert('Data has not been saved');
        }
    });
}

function ClearTextBox() {
    $('#EmployeeId').val(''),
    $('#EmployeeName').val(''),
    $('#Email').val('');
    $('#ProfileImage').val('');
    $('#Gender').val('');
    $('#Department').val('');
    $('#Salary').val('');
    $('#HireDate').val('');
}

function HideModalPopUp() {
    $('#EmployeeModal').modal('hide');
}

function Delete(employeeId) {
    debugger
    if (confirm('Are you sure, you want to delte this record')) {
        $.ajax({
            url: '/Employee/Delete?employeeId=' + employeeId,
            success: function () {
                alert('Record deleted');
                ShowEmployees();
            },
            error: function () {
                alert('Record cannot be deleted');
            }
        })
    }
}

function Edit(employeeId) {
    debugger
    $.ajax({
        url: '/Employee/Edit?employeeId=' + employeeId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeModal').modal('show');
            $('#EmployeeId').val(response.employeeId);
            $('#EmployeeName').val(response.employeeName);
            $('#Email').val(response.email);
            $('#ProfileImage').val(response.profileImage);
            $('#Gender').val(response.gender);
            $('#Department').val(response.department);
            $('#Salary').val(response.salary);
            $('#HireDate').val(response.hireDate);

            //$('#AddEmployee').css('display', 'none');
            //$('#btnUpdate').css('display', 'block');

            $('#AddEmployee').hide();
            $('#btnUpdate').show();
            $('#EmployeeHeading').text("Update Employee");

        },
        error: function () {    
            alert('Employee not found for id: ' + employeeId);
        }
    })
}


function UpdateEmployee() { debugger
    var objData = {
        employeeId: $('#EmployeeId').val(),
        employeeName: $('#EmployeeName').val(),
        email: $('#Email').val(),
        profileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        HireDate: $('#HireDate').val()
    }
    $.ajax({
        url: '/Employee/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('Employee data updated');
            ShowEmployees();
            HideModalPopUp();
            ClearTextBox();
        },
        error: function () {
            alert('Data has not been saved');
        }
    });
}

























