//imports
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./db/connection')

//prompt
function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'home',
                message: 'What would you like to do?',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add employee',
                    'update an employee',
                    'delete a role',
                    'delete an employee',
                    'delete a department',
                ],
            },
        ])
        .then(({ home }) => {
            switch (home) {
                case 'view all departments':
                    viewDepartments();
                    return;

                case 'view all roles':
                    viewRoles();
                    return;

                case 'view all employees':
                    viewEmployees();
                    return;

                case 'add a department':
                    addaDepartment();
                    return;

                case 'add a role':
                    addaRole();
                    return;

                case 'add employee':
                    addEmployee();
                    return;

                case 'update an employee':
                    updateEmployee();
                    return;

                case 'delete an employee':
                    deleteEmployee();
                    return;

                case 'delete a role':
                    deleteRole();
                    return;

                case 'delete a department':
                    deleteDepartment();
                    return;
            }
        });
}
//view department
function viewDepartments() {
    connection.query(
        'SELECT * FROM department', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        }
    )
}
//View roles
function viewRoles() {
    connection.query(
        'SELECT * FROM role', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        }
    )
}
//View Employee
function viewEmployees() {
    connection.query(
        'SELECT * FROM employee', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        }
    )
}

function addaDepartment() {

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'department',
            },
        ]).then((answers) => {
            connection.query('INSERT INTO department (name) values (?)', [answers.department], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        })
};

function addaRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: ' What role would you like to add?',
                name: 'role',
            },
            {
                type: 'input',
                message: "What is this role's salary?",
                name: 'salary',
            },
            {
                type: 'input',
                message: "What is this role's department id?",
                name: 'department_id',
            },
        ]).then((answers) => {
            connection.query('INSERT INTO role (title, salary, department_id) values (?, ?, ?)', [answers.role, answers.salary, answers.department_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is your employee's first name?",
                name: 'first_name',
            },
            {
                type: 'input',
                message: "What is your employee's last name?",
                name: 'last_name',
            },
            {
                type: 'input',
                message: "What is your employee's role_id?",
                name: 'role_id',
            },
            {
                type: 'input',
                message: "What is your employee's manager id?",
                name: 'manager_id',
            }
        ]).then((answers) => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}

function updateEmployee() {
    console.log('i am updating an employee')
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's id?",
                name: 'employee_id',
            },
            {
                type: 'input',
                message: "What is the employee's new role id?",
                name: 'role_id',
            },
        ]).then((answers) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}
function deleteRole() {
    console.log('i am deleting a role')
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the role's id?",
                name: 'role_id'
            },
        ]).then((answers) => {
            connection.query('DELETE FROM role WHERE id = ?', [answers.role_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}
function deleteEmployee() {
    console.log('i am deleting an employee')
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's id?",
                name: 'employee_id'
            },
        ]).then((answers) => {
            connection.query('DELETE FROM employee WHERE id = ?', [answers.employee_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}
function deleteDepartment() {
    console.log('i am deleting a department')
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the department's id?",
                name: 'department_id'
            },
        ]).then((answers) => {
            connection.query('DELETE FROM department WHERE id = ?', [answers.department_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        }
        )
}

init();