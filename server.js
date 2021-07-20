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

const addRoleQ = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role you would like to add?',
        validate: input => {
            if(input) {
                return true;
            } else { 
                console.log('You must provide a role name.');
                return false;
            }
        }
    },
    {
        title: 'input',
        name: 'roleSalary',
        message: 'What is the annual salary for this role?',
        validate: input => {
            if(input) {
                return true;
            } else { 
                console.log('You must provide a salary.');
                return false;
            }
        }
    }
];

const addDepartmentQ = [
    {
        type: 'input',
        name: 'deptName', 
        message: 'What is the name of the department you would like to add?',
        validate: input => {
            if(input) {
                return true;
            } else { 
                console.log('You must provide a department name.');
                return false;
            }
        }
    }
];

const updateRoleQ = [];


// function to process questions/answers 
function init() {
    console.log("Employee CMS");
    inquirer.prompt(initQuestion)
    .then(res => {
        switch(res.initQues) {
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
    inquirer.prompt(addEmployeeQ)
    .then(res => {
        // set first and last name to array 
        let employeeParams = [ res.firstName, res.lastName ];

        // get all role info
        const sqlRoles = `SELECT role.id, role.title FROM role`;
        let roleArr = [];

        db.query(sqlRoles, (err, rows) => {
            if (err) throw err; 
            // add roles and their ids to array
            rows.forEach(({ id, title }) => {
                roleArr.push({ 'name': title, 'id': id });
            });

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleName',
                    message: "What is this employee's job title?",
                    choices: roleArr
                }
            ])
            .then(res => {
                // filter out plain name into name with id
                var newRoleArr = roleArr.filter(function(el) {
                    return el.name === res.roleName;
                });

                // add role_id to employeeParams array
                employeeParams.push(newRoleArr[0].id);
                
                // get all manager info 
                const sqlManagers = `SELECT * FROM employee`;
                let managersArr = [];

                db.query(sqlManagers, (err, rows) => {
                    if(err) throw err;

                    rows.forEach(({ id, first_name, last_name }) => {
                        managersArr.push({ 'name': first_name + ' ' + last_name, 'id': id });
                    });
                    
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'managerName',
                            message: "Who is this employee's manager?",
                            choices: managersArr
                        }
                    ])
                    .then(res => {
                        // filter out plain name into name with id
                        var newManagerArr = managersArr.filter(function(el) {
                            return el.name === res.managerName;
                        });
                        
                        // add role_id to employeeParams array
                        employeeParams.push(newManagerArr[0].id);
                        
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                        
                        db.query(sql, employeeParams, (err, res) => {
                            if(err) throw err;
                            console.log('Employee added!' + `\n --------------------`);

                            init();
                        });
                    });
                });
                
            })
            .catch(err => {
                console.log(err);
            });
        });
    });
};

function addDepartment() {
    inquirer.prompt(addDepartmentQ)
    .then(res => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = [res.deptName];

        db.query(sql, params, (err, rows) => {
            if(err) throw err;

            console.log('Added ' + res.deptName + ' to departments!');
            init();
        });
    })
    .catch(err => {
        console.log(err);
    });
};

function addRole() {
    inquirer.prompt(addRoleQ)
    .then(res => {
        // set name and salary to roleInfo
        let roleInfo = res;

        // create array of departments to display in inquirer
        const sqlDepartment = `SELECT name, id FROM department`;
        let deptArr = [];

        db.query(sqlDepartment, (err, rows) => {
            if(err) throw err; 
            rows.forEach(({ name, id }) => {
                deptArr.push({ 'name':  name, 'id': id });
            });

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptName',
                    message: 'Which department is this role in?',
                    choices: deptArr
                }
            ])
            .then(res => {
                // filter out plain name into name with id
                var newArray = deptArr.filter(function(el) {
                    return el.name === res.deptName;
                });
                
                const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;
                const params = [roleInfo.roleName, Number(roleInfo.roleSalary), newArray[0].id];
                // add proper parameters to insert into query to create new role
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    
                    console.log('Added ' + roleInfo.roleName + ' to roles!' + `\n---------------------------`);
                    init();
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
};

function updateRole() {

};


// Start inquirer prompts after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    init();
});