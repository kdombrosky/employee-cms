const db = require('./db/connection.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



// inquirer questions
const initQuestion = [
    {
        type: 'list',
        name: 'initQues',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update an employee role', 'Exit']
    }
];

const addEmployeeQ = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name? ",
        validate: input => {
            if(input) {
                return true;
            } else { 
                console.log('You must provide a first name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name? ",
        validate: input => {
            if(input) {
                return true;
            } else { 
                console.log('You must provide a last name.');
                return false;
            }
        }
    }
];

const addRoleQ = [];

const addDepartmentQ = [];

const updateRoleQ = [];


// function to process questions/answers 
function init() {
    console.log("Employee CMS");
    inquirer.prompt(initQuestion)
    .then(response => {
        console.log(`We made it \n`);
        switch(response.initQues) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Exit':
                break;
        }
    })
    .catch(err => {
        console.log(err);
    });
}

// SQL Functions 
function viewEmployees() {
    console.log(`Displaying all employees \n-------------------------`);
    const sql = `SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title AS role, 
                department.name AS department,
                role.salary, 
                CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, rows) => {
        if(err) throw err;
        
        console.table(rows);
        init();
    });
};

function viewDepartments() {
    console.log(`Displaying all departments \n---------------------------`);
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if(err) throw err;
        
        console.table(rows);
        init();
    });
};

function viewRoles() {
    console.log(`Displaying all roles \n----------------------`);
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if(err) throw err;
        
        console.table(rows);
        init();
    });
};

function addEmployee() {
    console.log(`Adding employee info below: `);
};

function addDepartment() {

};

function addRole() {

};

function updateRole() {

};


// Start inquirer prompts after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    init();
});