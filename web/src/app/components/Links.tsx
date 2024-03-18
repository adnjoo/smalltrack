'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/constants';
import MyLink from '@/app/components/MyLink';

export default function Links() {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
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

  return (
    <div className='mx-auto max-w-2xl'>
      <h1 className='mb-4 text-3xl font-bold'>Links</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {data &&
          data?.map((link: any) => (
            <MyLink key={link.id} link={link} />
          ))}
      </div>
    </div>
  );
}
