'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/constants';

export default function Links() {
  const { getToken } = useAuth();
  const [editLink, setEditLink] = useState<any>({
    id: null,
    link: '',
    description: '',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
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

  const handleSubmit = async (id: number) => {
    try {
      await axios.post(`${API_URL}/links/upsert/${id}`, editLink, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
      setEditMode(false);
      setEditLink({ id: null, link: '', description: '' });
    }
  };

  const handleEdit = (link: any) => {
    setEditLink(link);
    setEditMode(true);
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <h1 className='mb-4 text-3xl font-bold'>Links</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {data &&
          data?.map((link: any) => (
            <div key={link.id} className='mb-4 rounded-lg border p-4'>
              {editMode ? (
                <div>
                  <h2 className='mb-2 text-lg font-semibold'>Edit Link</h2>
                  <label htmlFor='link'>Link:</label>
                  <input
                    id='link'
                    name='link'
                    type='text'
                    value={editLink.link}
                    onChange={(e) =>
                      setEditLink({ ...editLink, link: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300'
                  />
                  <label htmlFor='description'>Description:</label>
                  <input
                    type='text'
                    value={editLink.description}
                    onChange={(e) =>
                      setEditLink({ ...editLink, description: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300'
                  />
                  <button
                    onClick={() => handleSubmit(editLink.id)}
                    className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className='ml-2 mt-2 rounded-md bg-gray-500 px-4 py-2 text-white'
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <a
                    href={link.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {link.link}
                  </a>
                  <p>{link.description}</p>
                  <button
                    onClick={() => handleEdit(link)}
                    className='ml-2 mt-2 rounded-md bg-blue-500 px-4 py-2 text-white'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className='ml-2 mt-2 rounded-md bg-red-500 px-4 py-2 text-white'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
