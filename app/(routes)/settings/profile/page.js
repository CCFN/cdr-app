"use client"
// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ProfilePage component
const ProfilePage = () => {
    // State variables to manage the user profile data and form data
    const [userProfile, setUserProfile] = useState({});
    const [formData, setFormData] = useState({});
    const bURL = process.env.baseURL;

    // useEffect hook to fetch the user profile data from the server on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Retrieve user data and token from sessionStorage
                const userData = JSON.parse(sessionStorage.getItem('userData'));
                const { accessToken, id } = userData;

                // Send a GET request to fetch the user's profile data
                const response = await axios.get(`${bURL}user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // Update the state with the user profile data
                setUserProfile(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Call the fetchUserProfile function to fetch the user profile data
        fetchUserProfile();
    }, [bURL]);

    // Event handler for input field changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to update the user profile data on form submission
    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            // Retrieve user data and token from sessionStorage
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const { accessToken, id } = userData;

            // Send a PUT request to update the user profile with the new data
            await axios.put(`${bURL}user/updateprofile/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // Optionally, display a success message or perform any additional actions
        } catch (error) {
            console.log(error);
        }
    };

    // Console log the user profile data for debugging
    console.log(userProfile);

    // Render the ProfilePage component
    return (
        <div className="container mt-5">
            {/* Display the user profile data */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-lg bg-body rounded mb-2">
                <div className="d-flex justify-content-between p-2">
                    <button className="btn btn-dark text-capitalize" role="button">
                        <i className="fa fa-person" aria-hidden="true"></i> user profile
                    </button>
                </div>
            </div>

            <div className="row">
                {/* Display basic user information in a card */}
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-hover table-bordered border-dark rounded">
                                <tbody className="border-2">
                                    <tr className="border-2">
                                        <th>username</th>
                                        <td>{userProfile.username}</td>
                                    </tr>
                                    <tr className="border-2">
                                        <th>email</th>
                                        <td>{userProfile.email}</td>
                                    </tr>
                                    <tr className="border-2">
                                        <th>Enabled</th>
                                        {/* Display 'true' or 'false' based on the value of 'enabled' */}
                                        {userProfile.enabled ? (
                                            <td className="text-success fw-bold">true</td>
                                        ) : (
                                            <td className="text-danger fw-bold">false</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Display a card with additional information */}
                    <div className="card my-1">
                        <div className="card-body p-1">
                            <h6 className="card-title text-danger m-0 fw-bold">Additional Info</h6>
                            <p className="small text-capitalize">
                                only full name and roles can be edited
                            </p>
                        </div>
                    </div>
                </div>
                {/* Display a card with a form to update user profile data */}
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={updateProfile}>
                                <div className="row">
                                    <div className="col-6 my-2">
                                        <label className="label fw-bold text-capitalize" htmlFor="id">
                                            id (readonly)
                                        </label>
                                        {/* Display the user ID (read-only) */}
                                        <input
                                            type="text"
                                            id="id"
                                            name="id"
                                            readOnly
                                            value={userProfile.id}
                                            className="form-control border-dark border-2 shadow-none"
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="label fw-bold text-capitalize" htmlFor="facility">
                                            facility
                                        </label>
                                        {/* Display the facility name if available, else "Not Available" */}
                                        <input
                                            type="text"
                                            id="facility"
                                            name="facility"
                                            value={userProfile.facility ? userProfile.facility.name : "Not Available"}
                                            className="form-control border-dark border-2 shadow-none"
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="label fw-bold text-capitalize" htmlFor="username">
                                            full name
                                        </label>
                                        {/* Input field to edit the user's full name */}
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={userProfile.fullName}
                                            onChange={handleInputChange}
                                            className="form-control border-dark border-2 shadow-none"
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="label fw-bold text-capitalize" htmlFor="roles">
                                            roles
                                        </label>
                                        {/* Input field to edit the user's roles */}
                                        <input
                                            type="text"
                                            id="roles"
                                            name="roles"
                                            value={userProfile.roles ? userProfile.roles.map((role) => role.name) : "Not Available"}
                                            onChange={handleInputChange}
                                            className="form-control border-dark border-2 shadow-none"
                                        />
                                    </div>
                                    {/* Button to submit the form and update the profile */}
                                    <button className="btn btn-success mx-2 mt-3" type="submit">
                                        Click to Update profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
