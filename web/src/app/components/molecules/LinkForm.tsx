'use client';

import React, { useState } from 'react';
import axios from 'axios';

import { API_URL } from '@/app/lib/constants';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export default function LinkForm() {
  const [formData, setFormData] = useState({
    description: '',
    link: '',
  });
  const { getToken } = useAuth();
  const { refetch } = useQuery({
    queryKey: ['links'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await getToken();

    try {
      const response = await axios.post(`${API_URL}/links/upsert`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API response:', response.data);

      setFormData({
        description: '',
        link: '',
      });

      refetch();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h4>Link</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='link'>Link:</label>
          <input
            type='text'
            id='link'
            name='link'
            value={formData.link}
            onChange={handleChange}
            className='rounded-md border p-2'
          />
        </div>

        <div>
          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='rounded-md border p-2'
          />
        </div>

        <div>
          <button
            type='submit'
            className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
