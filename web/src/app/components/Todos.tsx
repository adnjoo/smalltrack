'use client';
import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { API_URL } from '@/app/lib/constants';

export default function Todos() {
  const { getToken } = useAuth();
  const [data, setData] = React.useState([]);

  const getData = async () => {
    const res = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    setData(res.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {data &&
        data?.map((todo) => (
          <div key={todo.id}>
            {todo.description}
            <input type='checkbox' checked={todo.done} />
          </div>
        ))}
    </div>
  );
}
