import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "../assets/css/users.css";

const roleOptions = [
    { value: "ROLE_MEA", label: "ROLE_MEA" },
    { value: "ROLE_USER", label: "ROLE_USER" },
    { value: "ROLE_MODERATOR", label: "ROLE_MODERATOR" },
    { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
    { value: "ROLE_SUPER_ADMIN", label: "ROLE_SUPER_ADMIN" },
];

const EditUser = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({ selectedRoles: [], selectedFacility: '' });
    const [inputClassName, setInputClassName] = useState('form-control border border-dark shadow-none');
    const [labelClassName, setLabelClassName] = useState('d-none');
    const [editedUser, setEditedUser] = useState({ ...user });
    const [apiLocations, setApiLocations] = useState([]);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const token = userData.accessToken;

    const bURL = process.env.baseURL;

    const handleFacilityChange = useCallback((selectedOption) => {
        const facility = selectedOption ? selectedOption.value : '';
        setEditedUser(prevUser => ({ ...prevUser, facility }));
    }, []);

    const handleStateChange = useCallback((selectedOption) => {
        const state = selectedOption ? selectedOption.value : '';
        setEditedUser(prevUser => ({ ...prevUser, state }));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    }, []);

    const handleSelectChange = useCallback((selectedOptions) => {
        const selectedRoles = selectedOptions.map(option => option.value);
        setFormData(prevData => ({ ...prevData, selectedRoles }));
        setEditedUser(prevUser => ({ ...prevUser, roles: selectedRoles }));
    }, []);

    const fetchLocations = useCallback(async () => {
        try {
            const response = await axios.get(bURL + "locations/all", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setApiLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [bURL, token]);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault();

        const getInputValue = (inputId) => document.getElementById(inputId).value;

        const fullName = getInputValue('fullNameInput');
        const password = getInputValue('passwordInput');

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

        try {
            const response = await axios.put(bURL + `user/${editedUser.id}/update`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.alert('User has been updated');
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
            window.alert(error.response.data.message);
        }
    }, [bURL, editedUser.email, editedUser.facility, editedUser.id, editedUser.state, editedUser.username, formData.selectedRoles, token]);

    function findObjectByName(objects, nameToFind) {
        return objects.find(item => item.name === nameToFind) || null;
    }

    function findObjectByStateId(objects, stateIdToFind) {
        return objects.find(item => item.state.id === stateIdToFind) || null;
    }

    function createSelectInput(data, name, id, label, onChange, value) {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <label className="form-label fw-bold text-capitalize" htmlFor={id}>{label}</label>
                <div className="input-group mb-2">
                    <Select
                        className={inputClassName}
                        name={name}
                        options={data}
                        onChange={onChange}
                        value={value}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder={`Select ${label}`}
                    />
                </div>
            </div>
        );
    }

    const selectedFacilityObject = findObjectByName(apiLocations, editedUser.facility);
    const selectedStateObject = findObjectByStateId(apiLocations, editedUser.state);

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

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <label className="form-label fw-bold text-capitalize" htmlFor="roleInput">Role <i className={labelClassName}></i></label>
                                    <div className="input-group mb-2">
                                        <Select
                                            className=""
                                            name="roles"
                                            options={roleOptions}
                                            isMulti
                                            onChange={handleSelectChange}
                                            value={roleOptions.filter(role => editedUser.roles.includes(role.value))}
                                        />
                                    </div>
                                </div>

                                {createSelectInput(apiLocations, "facility", "facilityInput", "facility", handleFacilityChange, selectedFacilityObject)}

                                {createSelectInput(apiLocations, "state", "stateInput", "state", handleStateChange, selectedStateObject)}

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <label className="form-label fw-bold text-capitalize" htmlFor="passwordInput">Password <i className={labelClassName}></i></label>
                                    <div className="input-group mb-2">
                                        <input id="passwordInput" name="password" value={editedUser.password} onChange={handleChange} type="password" className={inputClassName} />
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
