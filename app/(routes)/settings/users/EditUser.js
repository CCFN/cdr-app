import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "../assets/css/users.css";

// Define options for user roles. thses role options will come from the API
const roleOptions = [
    { value: "ROLE_MEA", label: "ROLE_MEA" },
    { value: "ROLE_USER", label: "ROLE_USER" },
    { value: "ROLE_MODERATOR", label: "ROLE_MODERATOR" },
    { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
    { value: "ROLE_SUPER_ADMIN", label: "ROLE_SUPER_ADMIN" },
];

// EditUser component
const EditUser = ({ user, onSave, onClose }) => {
    // State variables
    const [formData, setFormData] = useState({ selectedRoles: [], selectedFacility: '' });
    const [inputClassName, setInputClassName] = useState('form-control border border-dark shadow-none');
    const [labelClassName, setLabelClassName] = useState('d-none');
    const [editedUser, setEditedUser] = useState({ ...user });
    const [apiLocations, setApiLocations] = useState([]);

    // Retrieve user data and token from sessionStorage
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    // const token = userData.accessToken;
    // const loggedUser = userData.user;

    // Base URL for API requests
    const bURL = process.env.baseURL;

    // Event handler for input field changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    }, []);

    // Event handler for role selection changes
    const handleRoleChange = useCallback((selectedOptions) => {
        const selectedRoles = selectedOptions.map(option => option.value);
        setEditedUser(prevUser => ({ ...prevUser, roles: selectedRoles }));
    }, []);

    // Event handler for input field changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setInputClassName('form-control border border-dark shadow-none');
        setLabelClassName('d-none');
        // setSelectedRoles((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Event handler for select field changes
    const handleSelectChange = useCallback((selectedOptions) => {
        const selectedRoles = selectedOptions.map(option => option.value);
        setFormData(prevData => ({ ...prevData, selectedRoles }));
        setEditedUser(prevUser => ({ ...prevUser, roles: selectedRoles }));
    }, []);

    // Fetch locations from the API
    const fetchLocations = useCallback(async () => {
        try {
            const response = await axios.get(bURL + "locations/all");
            setApiLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Fetch locations when the component mounts
    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    // Event handler for saving user changes
    const handleSave = useCallback(async (e) => {
        e.preventDefault();

        // Function to get the value of an input field by its ID
        const getInputValue = (inputId) => document.getElementById(inputId).value;

        const fullName = getInputValue('fullNameInput');
        const password = getInputValue('passwordInput');
        const roles = getInputValue('roles');

        console.log(roles);

        // Prepare the updated user object
        const updatedUser = {
            "username": editedUser.username,
            "fullName": fullName,
            "email": editedUser.email,
            "roles": formData.selectedRoles,
            "password": password,
            "enabled": true,
            "state": editedUser.state,
            "facility": editedUser.facility
        };

        console.log(updatedUser);

        try {
            // Send PUT request to update the user
            const response = await axios.put(bURL + `user/${editedUser.id}/update`, updatedUser);
            window.alert('New user has been updated');
            // window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
            window.alert(error.response.data.message);
        }
    }, [bURL, editedUser.email, editedUser.facility, editedUser.id, editedUser.state, editedUser.username, formData.selectedRoles]);

    // Function to create the facility select input
    function createSelectInput(data) {
        return (
            <select
                className={inputClassName}
                name="facility"
                id="facilityInput"
                onChange={handleInputChange}
            >
                <option defaultValue>Select facility Id</option>
                {data.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        );
    }

    // Function to find an object in an array by its facility name
    function findObjectByFacilityName(objects, selectedFacility) {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].name === selectedFacility) {
                return objects[i];
            }
        }
        return null; // Return null if no match is found
    }

    // Function to find an object in an array by its state ID
    function findObjectByStateId(objects, selectedFacility) {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].state.id === selectedFacility) {
                return objects[i].state;
            }
        }
        return null; // Return null if no match is found
    }

    // Render the EditUser component
    return (
        <div className="modal modal-dialog modal-xl mt-3 d-block">
            <div className="modal-dialog mt-3">
                <div className="modal-content bg-light shadow bg-body">
                    <div className="modal-header p-0">
                        <h5 className="modal-title m-1">Edit User (email and username cannot be updated here)</h5>
                        <button type="button" className="btn btn-danger m-1" onClick={onClose}>
                            <i className="fa-solid fa-xmark fa-xl"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                {/* Full Name Input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <label className="form-label fw-bold text-capitalize" htmlFor="fullNameInput">Full Name</label>
                                    <div className="input-group mb-2">
                                        <input
                                            id="fullNameInput"
                                            name="fullName"
                                            value={editedUser.fullName}
                                            required
                                            onChange={handleChange}
                                            type="text"
                                            className={inputClassName}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>
                                {/* Password Input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <label className="form-label fw-bold text-capitalize" htmlFor="passwordInput">Password <i className={labelClassName}></i></label>
                                    <div className="input-group mb-2">
                                        <input id="passwordInput" name="password" value={editedUser.password} onChange={handleChange} type="password" className={inputClassName} />
                                    </div>
                                </div>
                                {/* Role Select */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <label className="form-label fw-bold text-capitalize" htmlFor="roleInput">Role <i className={labelClassName}></i></label>
                                    <div className="input-group mb-2">
                                        <Select
                                            className={inputClassName}
                                            name="roles"
                                            id="roles"
                                            options={roleOptions}
                                            isMulti
                                            onChange={handleSelectChange}
                                            value={roleOptions.filter(role => editedUser.roles.includes(role.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
