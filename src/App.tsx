import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { UserForm } from './components/UserForm';
import { PostList } from './components/PostList';
import { DepartmentList } from './components/DepartmentList';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userChanged = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    }

    // Listen for changes in localStorage
    window.addEventListener('storage', userChanged);

    // Call the function once initially
    userChanged();

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('storage', userChanged);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/PostList" element={user ? <><PostList /><DepartmentList /></> : <Navigate to="/" replace />} />
    </Routes>
  </Router>
  
  );
};

export default App;
