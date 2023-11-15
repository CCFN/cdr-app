"use client"
// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// StatesPage component
const StatesPage = () => {
    // Retrieve necessary data from sessionStorage and environment variable
    const bURL = process.env.baseURL;
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    // const token = userData.accessToken;
    // const loggeduserid = userData.id;

    // State variable to hold the list of states
    const [states, setStates] = useState([]);

    // useEffect hook to fetch the list of states from the server on component mount
    useEffect(() => {
        try {
            // Send a GET request to fetch the list of states
            axios.get(bURL + `state/`)
            .then((response) => {
                // Update the state with the list of states received from the server
                setStates(response.data);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    // Console log the fetched states and logged user id for debugging
    // console.log(states);
    // console.log(loggeduserid);

    // Render the StatesPage component
    return (
        <div className="container mt-5">
            {/* Display a header for the states implementation section */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-lg bg-body rounded mb-2">
                <div className="d-flex justify-content-between p-2">
                    <button className="btn btn-dark text-capitalize" role="button"><i className="fa fa-person" aria-hidden="true"></i> implementing states</button>
                </div>
            </div>
            <div class="table-responsive">
                {/* Display a table to show the list of states */}
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                            <th>State Name</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through the states and display each state's information in a row */}
                        {states.map(state => (
                            <tr key={state.id}>
                                <td>{state.id}</td>
                                <td>{state.createdAt}</td>
                                <td>{state.stateName}</td>
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

export default StatesPage;
