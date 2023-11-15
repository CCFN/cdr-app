"use client"
import UserContext from '../api/context/AuthContext'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { UserContextProvider } from '../api/context/AuthContext'

function LoginLayout({children}) {
    const { user } = useContext(UserContext)
    const router = useRouter()

    useEffect(() =>{
      if(user){
      router.push("/dashboard")
      }
    }, [user])
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default LoginLayout