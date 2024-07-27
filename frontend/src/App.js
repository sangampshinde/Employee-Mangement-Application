import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Custom components
import Home from "./pages/Home";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeForm from "./pages/EmployeeForm";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
