import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteEmployee } from '../Services/api';
import { useNavigate } from 'react-router-dom';



const DeleteConfirmation = ({ employeeId, onCancel, onConfirm }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId);
      onConfirm();
      navigate.push('/');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this employee?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation;