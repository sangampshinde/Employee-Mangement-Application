
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { getAllEmployees, getEmployeeById } from '../Services/api';
import"./home.css"

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await getEmployeeById(searchId);
        setEmployees([response.data]);
      } catch (error) {
        console.error('Error searching employee:', error);
      }
    } else {
      fetchEmployees();
    }
  };

  return (
    <div className="home-container">
      <h1 className="my-4 text-black">Employee Management</h1>
      <SearchBar
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onSearch={handleSearch}
        className="search-bar"
      />
      <Button as={Link} to="/add" variant="primary" className="mb-3 btn">
        Add Employee
      </Button>
      <EmployeeTable employees={employees} />
    </div>
  );
};

const SearchBar = ({ value, onChange, onSearch }) => (
  <InputGroup className="mb-3 input">
    <Form.Control
      placeholder="Search by ID"
      value={value}
      onChange={onChange}
    />
    <Button variant="outline-secondary" onClick={onSearch}>
      Search
    </Button>
  </InputGroup>
);

const EmployeeTable = ({ employees }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <EmployeeRow key={employee.id} employee={employee} />
      ))}
    </tbody>
  </Table>
);

const EmployeeRow = ({ employee }) => (
  <tr>
    <td>{employee.id}</td>
    <td>{employee.name}</td>
    <td>{employee.email}</td>
    <td>
    
      <Button as={Link} to={`/employee/${employee.id}`} variant="info" size="sm" className="me-2 btnView">
        <i className="bi bi-eye"></i> View
      </Button>
      <Button as={Link} to={`/edit/${employee.id}`} variant="warning" size="sm" className='btnEdit'>
        <i className="bi bi-pencil "></i> Edit
      </Button>
    </td>
  </tr>
);

export default Home;