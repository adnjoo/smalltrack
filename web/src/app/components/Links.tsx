'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/constants';

export default function Links() {
  const { getToken } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/links`, {
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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this link?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/links/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mx-auto max-w-md'>
      <h1 className='mb-4 text-3xl font-bold'>Links</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {data &&
          data?.map((todo: any) => (
            <div
              key={todo.id}
              className='mb-2 flex flex-col items-center rounded-xl border p-2'
            >
              <a href={todo.link} target='_blank'>
                {todo.link}
              </a>
              <div>{todo.description}</div>
              <button
                onClick={() => handleDelete(todo.id)}
                className='ml-2 text-red-500'
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
