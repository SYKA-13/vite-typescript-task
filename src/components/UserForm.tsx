import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './userform.css'; 

export const UserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    const submitForm = (e: React.FormEvent) => { 
        e.preventDefault();
      
  
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
          <form noValidate autoComplete="off" onSubmit={submitForm}> {/* Handle the submit event here */}
          <TextField 
  label="Name" 
  value={name} 
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
  fullWidth 
/>
<TextField 
  label="Phone" 
  value={phone} 
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} 
  fullWidth 
/>
<TextField 
  label="Email" 
  value={email} 
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
  fullWidth 
/>

            <Button variant="contained" className="submit-button" type="submit"> {/* Add type="submit" here */}
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  };
  