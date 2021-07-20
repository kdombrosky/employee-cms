
INSERT INTO department (name)
VALUES 
('Sales'),
('Marketing'),
('Finance'),
('Software');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Manager', 90000, 2),
('Sales Manager', 100000, 1),
('Financial Analyst', 55000, 3),
('Accountant', 80000, 3),
('Sales Rep', 60000, 1),
('Marketing Coordinator', 75000, 2),
('Full-Stack Web Developer', 100000, 4),
('Front-End Web Developer', 75000, 4),
('Back-End Web Developer', 75000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kayla', 'Dombro', 7, NULL), 
('Joseph', 'Anton', 8, 1),
('Sebastian', 'Santos', 9, 1),
('Sean', 'Smith', 6, 1),
('Anderson', 'Miller', 2, NULL), 
('Griffon', 'Butte', 5, 5),
('Alex', 'Wale', 3, NULL);