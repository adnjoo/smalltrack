'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/lib/constants';
import { useAuth } from '@clerk/nextjs';

export default function TodoForm() {
  const [formData, setFormData] = useState({
    description: '',
    done: false,
  });
  const { getToken } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getToken();

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(`${API_URL}/todos/upsert`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle the response as needed
      console.log('API response:', response.data);

      // Clear the form after successful submission (optional)
      setFormData({
        description: '',
        done: false,
      });
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h4>Todo</h4>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor='done'>
            <input
              type='checkbox'
              id='done'
              name='done'
              checked={formData.done}
              onChange={handleChange}
            />
            Done
          </label>
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
