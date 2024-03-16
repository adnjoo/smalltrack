'use client';
import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/constants';

export default function Todos() {
  const { getToken } = useAuth();
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h1>Todos</h1>
      {data &&
        data?.map((todo: any) => (
          <div key={todo.id}>
            {todo.description}
            <input type='checkbox' checked={todo.done} />
          </div>
        ))}
    </div>
  );
}
