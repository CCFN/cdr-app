"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCover } from "./loader";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const router = useRouter();


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

      try {
        const response = await signIn("credentials", {
          username:username, password:password, redirect: false
        });

        if(response.error){
          setLoading(false)
          alert("Invalid Credentials!");
          console.log(response.error)
          return;
        }
        setLoading(false)
        router.replace("dashboard")
      } catch (error) {
        console.log(error)
      }
    

  };

  return (
    <>
    {
      loading &&  <LoaderCover />
      
  }

    <div className="container-fluid login-section">
      

        <div className="auth-form-container">
          <img src="/images/Login-logo.png" alt="CCFN Logo" className="logo1" />
          <form onSubmit={handleSubmit} method="POST">
            <div className="row my-3">
              <div className="d-flex">
                <i className="fa-solid fa-user input-border-bottom my-2 py-2 px-3"></i>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control input-border-bottom rounded-0"
                  placeholder="Enter Username"
                  aria-describedby="helpId"
                />
              </div>
            </div>

            <div className="row my-2">
              <div className="d-flex">
                <i className="fa-solid fa-lock input-border-bottom my-2 py-2 px-3"></i>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control input-border-bottom rounded-0"
                  placeholder="Enter password"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <button type="submit" role="button">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>

    </div>

    </>
  )
};

export default LoginForm;