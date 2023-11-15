"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  //=======================================
  const [statedata, setStatedata] = useState([]);
  const [fadata, setFadata] = useState([]);
  const {data: session} = useSession();
  const user = session?.user;

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
    };
    const bURL = process.env.baseURL;
//---- When the upload button is clicked
  const handleUpload = async () => {
    
    // const userData = JSON.parse(sessionStorage.getItem("userData"));
    // const token = userData.accessToken;

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios
          .post(bURL + "batch/upload", formData, {
            headers: {
              Accept: "application/json",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          })

        setUploadStatus(response.data.status);
      } catch (error) {
        console.error(error);
        setUploadStatus("Failed");
      } finally {
        setUploadProgress(0);
      }
    }
    };

  return (
    <div className="container mt-5 my-5">
      <h3 className="text-center">XML File Upload</h3>
      <div
        className="card shadow p-3 mb-3 rounded text-center cursor-pointer"
        //className={`upload-box mb-3${dragging ? " dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBoxClick}
      >
        <input
          type="file"
          className="custom-file-input form-control"
          id="uploadFile"
          onChange={handleFileSelect}
          ref={fileInputRef}
          hidden
        />
        <span>
          <i className="fas fa-cloud-upload h1"></i>
        </span>

        <label className="label custom-file-label" htmlFor="uploadFile">
          {selectedFile
            ? selectedFile.name
            : "Click to choose or drag and drop file"}
        </label>
      </div>

      <button
        className="btn btn-primary btn-block col-12"
        onClick={handleUpload}
      >
        Upload
      </button>

      {/* {uploadStatus && ( */}
 
      {/* )} */}
      {uploadProgress > 0 && (
        <div className="progress mt-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
