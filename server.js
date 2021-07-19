const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// import sql functions from new page

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'yksorbmoD331!',
        database: 'employee_cms'
    },
    console.log('Connected to the employee_cms database.')
);

// Start inquirer prompts after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    init();
});

// inquirer questions 
const initQuestion = [
    {
        type: 'list',
        name: 'initQues',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update an employee role']
    }
];


// function to process questions/answers 
function init() {
    console.log("Employee CMS");
    inquirer.prompt(initQuestion)
            .then(response => {
                console.log("We made it");
                switch(response.initQues) {
                    case 'View all employees':
                        console.log('View all employees');
                        break;
                    case 'View all departments':
                        console.log('View all departments');
                        break;
                    case 'View all roles':
                        console.log('View all roles');
                        break;
                    case 'Add an employee':
                        console.log('Add an employee');
                        break;
                    case 'Add a department':
                        console.log('Add a department');
                        break;
                    case 'Add a role':
                        console.log('Add a role');
                        break;
                    case 'Update an employee role':
                        console.log('Update an employee role');
                        break;
                }
            })
            .catch(err => {
                console.log(err);
            });
}


