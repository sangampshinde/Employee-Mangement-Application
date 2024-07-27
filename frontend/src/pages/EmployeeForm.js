import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getEmployeeById, createEmployee, updateEmployee, getCountries } from '../Services/api';
import "./Form.css"

const EmployeeForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetchCountries();
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await createEmployee(employee);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };



  return (

    <div className='form-container'>
      <Form onSubmit={handleSubmit} className="mt-4 p-2">
      <h2 className='text-center pt-2'>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <Form.Group className="mb-1 frormGroup">
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder='Your Name'
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-1 frormGroup">
        <Form.Label>Email</Form.Label>
        <Form.Control
          placeholder='Your email'
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-1 frormGroup">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
         placeholder='Your mobile number'
          type="tel"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-1 frormGroup">
        <Form.Label>Country</Form.Label>
        <Form.Select
          name="country"
          value={employee.country}
          onChange={handleChange}
          required
        >
          <option value="" className="mb-1 frormGroup">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-1 frormGroup">
        <Form.Label>State</Form.Label>
        <Form.Control
        placeholder='Your State'
          type="text"
          name="state"
          value={employee.state}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2 frormGroup">
        <Form.Label>District</Form.Label>
        <Form.Control
          placeholder='Your District'
          type="text"
          name="district"
          value={employee.district}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="me-2 ">
        {id ? 'Update' : 'Create'}
      </Button>
      <Button onClick={() => navigate('/')} variant="secondary">
        Cancel
      </Button>
    </Form>
    </div>
  )
}

export default EmployeeForm;