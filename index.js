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
                    'add an employee',
                    //------------FUTURE DEVELOPMENTS---------
                    // 'update an employee role',
                    // 'delete a role',
                    // 'delete an employee',
                    // 'delete a department',
                    //----------------------------------------
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
        'SELECT * FROM employee', function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        }
    )
}
//View Employee
function viewEmployees() {
    connection.query(
        'SELECT * FROM role', function (err, res) {
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

init();