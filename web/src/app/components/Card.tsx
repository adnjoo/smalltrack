'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/lib/constants';

export default function Card() {
  const [data, setData] = useState('');

  const getData = async () => {
    const res = await axios.get(`${API_URL}`);
    // console.log("res", res.data.message);
    setData(res.data.message);
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>{data}</div>;
}
