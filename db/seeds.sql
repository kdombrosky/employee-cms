
INSERT INTO department (name)
VALUES 
('Sales'),
('Marketing'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Manager', 90000, 2),
('Sales Manager', 100000, 1),
('Financial Analyst', 55000, 3),
('Accountant', 80000, 3),
('Sales Rep', 60000, 1),
('Marketing Coordinator', 75000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kayla', 'Dombro', 1, NULL), 
('Joseph', 'Anton', 6, 1),
('Sebastian', 'Santos', 6, 1),
('Sean', 'Smith', 6, 1),
('Anderson', 'Miller', 2, NULL), 
('Griffon', 'Butte', 5, 5),
('Alex', 'Wale', 3, NULL);