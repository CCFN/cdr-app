"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// RolesPage component
const RolesPage = () => {
    // Retrieve necessary data from sessionStorage and environment variable
    const bURL = process.env.baseURL;
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    // const token = userData.accessToken;
    // const loggeduserid = userData.id;

    // State variable to hold the list of roles
    const [roles, setRoles] = useState([]);

    // useEffect hook to fetch the list of roles from the server on component mount
    useEffect(() => {
        try {
            // Send a POST request to fetch the list of roles
            axios.post(bURL + `role/`, [])
            .then((response) => {
                // Update the state with the list of roles received from the server
                setRoles(response.data);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    // Console log the fetched roles and logged user id for debugging
    // console.log(roles);
    // console.log(loggeduserid);

    // Render the RolesPage component
    return (
        <div className="container mt-5">
            {/* Display a header for the user roles section */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-lg bg-body rounded mb-2">
                <div className="d-flex justify-content-between p-2">
                    {/* Button to view user roles (disabled) */}
                    <button disabled className="btn btn-dark text-capitalize" role="button">
                        <i className="fa fa-person" aria-hidden="true"></i> user roles
                    </button>
                    {/* Button to create more roles */}
                    <button className="btn btn-dark text-capitalize" role="button">
                        <i className="fa fa-add" aria-hidden="true"></i> create more roles
                    </button>
                </div>
            </div>
            <div class="table-responsive">
                {/* Display a table to show the list of roles */}
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Role Name</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through the roles and display each role's information in a row */}
                        {roles.map(role => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td className="d-flex justify-content-evenly">
                                    <i className="btn btn-primary btn-sm fa fa-pencil"></i> {/* Button for edit action */}
                                    <i className="btn btn-danger btn-sm fa fa-trash"></i> {/* Button for delete action */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolesPage;
