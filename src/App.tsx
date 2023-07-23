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
  // A piece of state to hold our user
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // On mount, try to get the user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if(loading) {
    return <div>Loading...</div>; // Replace this with your own loading component or spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/PostList" : "/UserForm"} />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/PostList" element={
          user ? (
            <>
              <PostList />
              <DepartmentList />
            </>
          ) : (
            <Navigate to="/UserForm" replace />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
