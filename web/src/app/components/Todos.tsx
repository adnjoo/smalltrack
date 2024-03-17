'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/constants';

export default function Todos() {
  const { getToken } = useAuth();
  const { data, isLoading, refetch } = useQuery({
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/todos/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todos</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {data &&
          data?.map((todo: any) => (
            <div key={todo.id} className="flex items-center mb-2">
              <input type="checkbox" checked={todo.done} className="mr-2 form-checkbox" />
              <span className={todo.done ? "line-through" : ""}>{todo.description}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
