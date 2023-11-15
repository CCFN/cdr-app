"use client"

// Import necessary libraries and components
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import EditFacility from './EditFacility';
import CreateFacility from './CreateFacility';
import Select from 'react-select';
import "../assets/css/facilities.css";
import allFacilityData from "./data.json"
import axios from 'axios';
import { headers } from 'next/dist/client/components/headers';

// FacilitiesPage component
const FacilitiesPage = () => {
  // Initialize state variables
  const [isShown, setIsShown] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFacility, setEditingFacility] = useState(null);
  const [columnClassName, setColumnClassName] = useState('d-block');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputClassName, setInputClassName] = useState('form-control border border-dark shadow-none');
  const [labelClassName, setLabelClassName] = useState('d-none');
  const [facilities, setFacilities] = useState([]);

  // Retrieve necessary data from sessionStorage and environment variable
  // const bURL = process.env.baseURL;
  // const userData = JSON.parse(sessionStorage.getItem('userData'));
  // const token = userData.accessToken;

  // Fetch facilities data from the API on component mount
  useEffect(() => {
    try {
      axios.get(bURL + "locations/all")
        .then((response) => {
          setFacilities(response.data);
          //console.log(facilities);
        });
    } catch (e) {
      console.log(e);
      //console.log(facilities);
    }
  }, []);

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFacility((prevFacility) => ({ ...prevFacility, [name]: value }));
  };

  // Function to handle changes in the role selection
  const handleSelectChange = (selected) => {
    const selection = Array.from(selected, sl => sl.value);
    setSelectedOptions(selection);
  };

  // Function to handle searching based on search term
  const handleSearch = (e) => { setSearchTerm(e.target.value) };

  // Function to handle the creation of a new facility
  const handleCreateFacility = (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['facilityname', 'fullName', 'email', 'state', 'password'];
    if (!validateRequiredFields(requiredFields)) {
      setLabelClassName('d-inline text-danger fa-solid fa-xmark');
      return;
    }

    // Create a new facility object with the form data
    const { facilityname, fullName, email, state, password } = newFacility;
    const createdFacility = {
      facilityname,
      fullName,
      email,
      state,
      role: selectedOptions,
      password,
    };

    console.log(selectedOptions);

    // Send the new facility data to the API for creation
    axios
      .post(bURL + 'location/add', createdFacility)
      .then((response) => {
        window.alert('New facility has been created');
      })
      .catch((error) => {
        console.error('Error creating facility:', error.message);
      });
  };

  // Function to validate required fields
  const validateRequiredFields = (requiredFields) => {
    for (const field of requiredFields) {
      if (newFacility[field].trim() === '' || newFacility[field].trim() === [] || newFacility[field].trim() === {}) {
        return false;
      }
    }
    return true;
  };

  // Function to handle editing a facility
  const handleEdit = (id) => {
    const facilityToEdit = facilities.find((facility) => facility.id === id);
    setEditingFacility(facilityToEdit);
    setIsShown(current => !current);
    setColumnClassName('d-none');
  };

  // Function to handle saving the edited facility
  const handleSaveEdit = (editedFacility) => {
    // Update the facility data with the edited facility
    const updatedFacilities = facilities.map((facility) => facility.id === editedFacility.id ? editedFacility : facility);
    setFacilities(updatedFacilities);
    setEditingFacility(null);
    setIsShown(current => !current);
    setColumnClassName('d-block');
  };

  // Function to handle canceling the edit operation
  const handleCancelEdit = () => {
    setEditingFacility(null);
    setIsShown(current => !current);
    setColumnClassName('d-block');
  };

  // Function to handle deleting a facility
  const handleDelete = (id) => {
    if (window.confirm(`Delete the facility?`)) {
      const updatedFacilities = facilities.filter((facility) => facility.id !== id);
      setFacilities(updatedFacilities);
    }
  };

  // Filtered facilities based on search term
  const filteredFacilities = facilities.filter((facility) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return (
      facility.name.toLowerCase().includes(lowercaseSearchTerm) ||
      facility.datimCode.toLowerCase().includes(lowercaseSearchTerm) ||
      facility.lga.lgaName.toLowerCase().includes(lowercaseSearchTerm) ||
      facility.state.stateName.toLowerCase().includes(lowercaseSearchTerm)
    );
  });

  // Function to toggle the visibility of a section
  const handleClick = event => { setIsShown(current => !current) };

  // Render the FacilitiesPage component
  return (
    <div className="m-4">
      <div className="container-fluid">
        <div className="row row-cols-2,row-cols-3, auto,d-flex justify-content-center mt-2">
          {/* Display the form to create a new facility */}
          {editingFacility && (<EditFacility facility={editingFacility} onSave={handleSaveEdit} onClose={handleCancelEdit} />)}
          <div className={`${columnClassName} col-xs-12 col-sm-12 col-md-10 col-lg-10 shadow-lg bg-body rounded mb-2`}>
            <div className="d-flex justify-content-start p-2">
              <button onClick={handleClick} disabled="true" className="btn btn-dark text-capitalize" data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button"><i className="fa fa-plus" aria-hidden="true"></i> create new facilities</button>
            </div>
            {/* Modal */}
            <div className="modal fade modal-dialog modal-xl mt-0" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel">
              {/* Modal content */}
              <div className="modal-dialog mt-0">
                <div className="modal-content bg-light shadow-lg bg-body">
                  <form method='POST'>
                    <div className="modal-body">
                      <div className="row">
                        {/* Form fields for creating a new facility */}
                        {/* Facility name */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="facilitynameInput">Facility name <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0">
                                <i className="fa-solid fa-facility h5 mt-2 fa-2xl"></i>
                              </div>
                            </div>
                            <input id="facilitynameInput" name="facilityname" required onChange={handleInputChange} type="text" className={inputClassName} placeholder="Facilityname" />
                          </div>
                        </div>
                        {/* Full Name */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="fullNameInput">Full Name <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                            </div>
                            <input id="fullNameInput" name="fullName" required onChange={handleInputChange} type="text" className={inputClassName} placeholder="Full Name" />
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="emailInput">Email <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-envelope p-0 h5 mt-2 fa-2xl"></i></div>
                            </div>
                            <input id="emailInput" name="email" required onChange={handleInputChange} type="email" className={inputClassName} placeholder="Email" />
                          </div>
                        </div>
                        {/* State */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="stateInput">state <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-location-dot p-0 h5 mt-2 fa-2xl"></i></div>
                            </div>
                            <select className={inputClassName} name="state" id="stateInput" onChange={handleInputChange}>
                              <option selected>Select State</option>
                              <option value="Abia">Abia</option>
                              <option value="Enugu">Enugu</option>
                              <option value="Imo">Imo</option>
                              <option value="Abuja">Abuja</option>
                            </select>
                          </div>
                        </div>
                        {/* Role */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="roleInput">Role <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-unlock-keyhole p-0 h5 mt-2 fa-2xl"></i></div>
                            </div>
                            <Select className={inputClassName} isSearchable="true" name="role" options={roleOptions} isMulti onChange={handleSelectChange} placeholder="Select Facility Role" />
                          </div>
                        </div>
                        {/* Password */}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <label className="form-label fw-bold text-capitalize" htmlFor="passwordInput">Password <i className={labelClassName}></i></label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-unlock-keyhole p-0 h5 mt-2 fa-2xl"></i></div>
                            </div>
                            <input id="passwordInput" name="password" onChange={handleInputChange} type="password" className={inputClassName} placeholder="password" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer p-0 d-flex justify-content-between">
                      <input type="reset" value="Close" onClick={handleClick} className="btn btn-danger" data-bs-dismiss="modal" />
                      <button onClick={handleCreateFacility} type="button" className="btn btn-success">Save Facility</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Display the facilities list */}
          {isShown && (<div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 shadow-lg bg-body rounded">
            <div className="d-flex justify-content-between py-2">
              <h3 className="text-capitalize">facilities list</h3>
              <div>
                <div className="input-group">
                  <input className="form-control border border-dark btn-outline-success shadow-none rounded-0 fw-bold" type="text" value={searchTerm} onChange={handleSearch} placeholder="Enter search term" />
                </div>
              </div>
            </div>
            <div className="tableFixHead mb-3">
              <table className="table table-scroll table-hover table-bordered">
                <thead className="text-center text-capitalize border border-dark mt-0 pt-0">
                  <tr>
                    <th className="th">id</th>
                    <th className="th">facility name</th>
                    <th className="th">state name</th>
                    <th className="th">lga name</th>
                    <th className="th">datim code</th>
                    <th className="th">action</th>
                  </tr>
                </thead>
                <tbody className="text-center text-capitalize border border-dark">
                  {/* Display facilities data */}
                  {filteredFacilities.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-danger text-lowercase fw-bold">{searchTerm} not found</td>
                    </tr>
                  ) : (
                    filteredFacilities.map((facility, index) => (
                      <tr key={facility.id}>
                        <td>{index + 1}</td>
                        <td>{facility.name}</td>
                        <td>{facility.state.stateName}</td>
                        <td>{facility.lga.lgaName}</td>
                        <td>{facility.datimCode}</td>
                        <td className="text-center">
                          <i onClick={() => handleEdit(facility.id)} className=" btn mx-1 btn-outline-primary btn-sm fa fa-pencil"></i>
                          {/* <i onClick={() => handleDelete(facility.id)} className="btn mx-1 btn-danger btn-sm fa fa-trash"></i> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;
