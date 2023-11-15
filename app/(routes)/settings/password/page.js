"use client"
// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

// PasswordPage component
const PasswordPage = () => {
    // State variables to manage the component's state
    const [message, setMessage] = useState('password update');
    const [users, setUsers] = useState([]);

    // Retrieve necessary data from sessionStorage and environment variable
    const bURL = process.env.baseURL;
    const {data: session} = useSession()
    const userData = session?.user;
    //const token = userData.accessToken;
    const loggeduser = userData?.user;
    const loggeduserEmail = userData?.email;
    const loggeduserId = userData?.id;

    // useEffect hook to fetch user data from the server on component mount
    useEffect(() => {
        try {
            axios.get(bURL + `user/${loggeduserId}`)
            .then((response) => {
                setUsers(response.data);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    // Event handler for form submission to update the password
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Function to get the value of an input field by its ID
        const getInputValue = (inputId) => document.getElementById(inputId).value;
        const confirmPassword = getInputValue('confirmPassword');
        const newPassword = getInputValue('newPassword');

        // Validate passwords to ensure they match
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password must match.');
        }

        // Prepare the updatedPassword object for the API request
        const updatedPassword = {
            "confirmPassword": confirmPassword,
            "password": newPassword,
            "user": loggeduserId
        };

        try {
            // Send a POST request to update the user's password
            const response = await axios.post(bURL + `user/changepassword`, updatedPassword);
            window.alert('User password has been updated');
            location.reload();
        } catch (error) {
            // Display an error alert if there's an issue with the API request
            window.alert(`${error.code} (${error.message})`);
        }
    };

    // Render the PasswordPage component
    return (
        <div className="container mt-5">
            <div className='card'>
                <div className="d-flex justify-content-center border-3 border-bottom border-dark">
                    <h2 className='card-title text-center'>Update Password</h2>
                    {/* Commented out, but could be used to display a message */}
                    {/* {message && <h6 className='card-title text-danger'>{message}</h6>} */}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='row p-3'>
                        {/* Input field for displaying the username (read-only) */}
                        <div className='col-6 my-2'>
                            <label className='label fw-bold text-capitalize' htmlFor="username">Username (readonly)</label>
                            <input type="text" name='username' id="username" value={loggeduser} className="form-control border-dark border-2 shadow-none" readOnly />
                        </div>
                        {/* Input field for displaying the email (read-only) */}
                        <div className='col-6 my-2'>
                            <label className='label fw-bold text-capitalize' htmlFor="current-password">Email (readonly)</label>
                            <input type="email" id="email" value={loggeduserEmail} className="form-control border-dark border-2 shadow-none" readOnly />
                        </div>
                        {/* Input field for entering the new password */}
                        <div className='col-6 my-2'>
                            <label className='label fw-bold text-capitalize' htmlFor="new-password">New Password</label>
                            <input type="password" id="newPassword" className="form-control border-dark border-2 shadow-none" />
                        </div>
                        {/* Input field for confirming the new password */}
                        <div className='col-6 my-2'>
                            <label className='label fw-bold text-capitalize' htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirmPassword" className="form-control border-dark border-2 shadow-none" />
                        </div>
                        {/* Button to submit the form and update the password */}
                        <button className='btn btn-success mx-2 mt-3' type="submit">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordPage;
