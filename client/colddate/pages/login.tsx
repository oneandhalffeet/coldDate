import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('http://localhost:4545/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    console.log(`Logged in ${response.status}==${response.body}`);
    if (response.ok) {
      const { token } = await response.json()

      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token)
      router.push({
        pathname: '/profile'
      })
    } else {
      // Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}