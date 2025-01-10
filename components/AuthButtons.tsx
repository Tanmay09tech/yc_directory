  'use client'  // This marks it as a client component

  import { signIn, signOut } from 'next-auth/react'
  //Create buttons since they are client components and NEXT AUTH is a server component so using both is not possible
  export function LoginButton() {  
    return (
      <button type= "submit" onClick={() => signIn('github')}>
        <span>Login</span>
      </button>
    )
  }

  export function LogoutButton() {
    return (
      <button onClick={() => signOut()}>
        <span>Logout</span>
      </button>
    )
  }