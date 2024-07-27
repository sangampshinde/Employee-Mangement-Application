import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { getEmployeeById } from '../Services/api';
import DeleteConfirmation from './DeleteConfirmation';
import"./EmpDeatils.css"

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
   
    <Card className="mt-4 container">
      <Card.Header as="h5">Employee Details</Card.Header>
      <Card.Body>
        <Card.Text><strong>ID:</strong> {employee.id}</Card.Text>
        <Card.Text><strong>Name:</strong> {employee.name}</Card.Text>
        <Card.Text><strong>Email:</strong> {employee.email}</Card.Text>
        <Card.Text><strong>Mobile:</strong> {employee.mobile}</Card.Text>
        <Card.Text><strong>Country:</strong> {employee.country}</Card.Text>
        <Card.Text><strong>State:</strong> {employee.state}</Card.Text>
        <Card.Text><strong>District:</strong> {employee.district}</Card.Text>
        <Button as={Link} to={`/edit/${employee.id}`} variant="primary" className="me-2">
          <i className="bi bi-pencil"></i> Edit
        </Button>
        <Button onClick={() => setShowDeleteConfirmation(true)} variant="danger" className="me-2">
          <i className="bi bi-trash"></i> Delete
        </Button>
        <Button as={Link} to="/" variant="secondary" className='mt-sm-2'>
          <i className="bi bi-arrow-left"></i> Back to Home
        </Button>
      </Card.Body>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          employeeId={employee.id}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={() => {/* Handle delete confirmation */}}
        />
      )}
    </Card>
    
  )
}

export default EmployeeDetails;