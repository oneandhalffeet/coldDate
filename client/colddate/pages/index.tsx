import Link from 'next/link';
import React, {useEffect, useState} from 'react'

function index() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:4545/").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        setMessage(data.message);
      }
    )
  }, [])
  return (
    <div>
      <Link href={'/login'}>Login</Link>
      <Link href={'/register'}>Register</Link>
      {message}
    </div>
  )
}

export default index
