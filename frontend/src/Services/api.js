import axios from 'axios';


export const getAllEmployees = () => axios.get(`http://localhost:5000/employees`);
export const getEmployeeById = (id) => axios.get(`http://localhost:5000/employees/${id}`);
export const createEmployee = (employee) => axios.post(`http://localhost:5000/employees`, employee);
export const updateEmployee = (id, employee) => axios.put(`http://localhost:5000/employees/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`http://localhost:5000/employees/${id}`);
export const getCountries = () => axios.get(`http://localhost:5000/countries`);
