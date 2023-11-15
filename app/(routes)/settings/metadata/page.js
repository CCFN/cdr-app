"use client"
// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MetadataPage component
const MetadataPage = () => {
    // Retrieve necessary data from sessionStorage and environment variable
    const bURL = process.env.baseURL;
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    // const token = userData.accessToken;

    // State variable to hold the metadata extracted from the server
    const [metadata, setMetadata] = useState([]);

    // Function to fetch and extract metadata from the server
    const extractMetadata = () => {
        try {
            // Send a GET request to extract metadata
            axios.get(`${bURL}metadata/extract`)
            .then((response) => {
                // Update the state with the extracted metadata received from the server
                setMetadata(response.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Console log the extracted metadata for debugging
    //console.log(metadata);

    // Render the MetadataPage component
    return (
        <div className="container mt-5">
            {/* Display a header for the user metadata section */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-lg bg-body rounded mb-2">
                <div className="d-flex justify-content-between p-2">
                    <button className="btn btn-dark text-capitalize" role="button">
                        <i className="fa fa-person" aria-hidden="true"></i> User Metadata
                    </button>
                    {/* Button to trigger the extraction of metadata */}
                    <button className="btn btn-primary text-capitalize" role="button" onClick={extractMetadata}>
                        <i className="fa fa-download" aria-hidden="true"></i> Extract Metadata
                    </button>
                </div>
            </div>

            {/* Display a section for uploading metadata */}
            <div className="my-2 p-0">
                <label className='label text-capitalize fw-bold'>Click to select metadata or drag and drop</label>
                {/* Input field to select metadata file */}
                <input className="form-control text-center m-0 p-5 text-danger" type="file" id="formFile" style={{ "textAlignLast": "center" }} />
                {/* Button to upload the selected metadata file */}
                <button type="button" className="btn btn-primary mt-2 col-12">Upload</button>
            </div>
        </div>
    );
};

export default MetadataPage;
