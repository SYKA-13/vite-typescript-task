import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './postlist.css';
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    navigate('/');
  };

  return (
    // <div className="post-list">
    <div >
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
      <DataGrid 
        rows={posts} 
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'userId', headerName: 'User ID', width: 130 },
          { field: 'title', headerName: 'Title', width: 200 },
          { field: 'body', headerName: 'Body', width: 500 },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection 
      />
    </div>
    // </div>
  );
};
