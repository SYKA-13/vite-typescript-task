import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './UserForm.css'; // Import the CSS file

export const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submitForm = () => {
    // Basic form validation
    if (!name || !phone || !email) {
      alert('Please fill out all the fields.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ name, phone, email }));
    navigate('/PostList');
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <form noValidate autoComplete="off">
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <Button variant="contained" className="submit-button" onClick={submitForm}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
