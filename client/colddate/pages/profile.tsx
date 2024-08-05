import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

export default function Profile() {
  const [data, setData] = useState({'name':'', 'email': ''})

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      var json = jwt.decode(token);
      setData(json);
    }
  }, []);
  return (
    <div>Welcome {data.name}</div>
  )
}