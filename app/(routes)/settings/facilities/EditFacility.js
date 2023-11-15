import React, { useState } from 'react';
import Select from 'react-select';
import "../assets/css/facilities.css";
import { states, lga, facilities } from "../../data/facilityList";


function Edit({ facility, onSave, onClose }) {
    const [inputClassName, setInputClassName] = useState('form-control border border-dark shadow-none');
    const [editedFacility, setEditedFacility] = useState({ ...facility });

    const [labelClassName, setLabelClassName] = useState('d-none');

    //handles the state options changes. 
    const handleState = (data) => {
        const selectedStateIds = Array.from(data, dt => dt.value);
        setSelectedState(selectedStateIds)
        const filter_state = lga.filter((lga) => {
            return selectedStateIds.some((state) => {
                return state === lga.stateid
            })
        })
        setFilteredLGAs(filter_state)
    }

    //handles the LGA options changes. 
    const handleLGA = (data) => {
        const selectedLGAIds = Array.from(data, dt => dt.value);
        setSelectedLGAs(selectedLGAIds)
        const filter_facility = facilities.filter((fac) => {
            return selectedLGAIds.some((lga) => {
                return lga === fac.lgaid
            })
        })
        setFilteredFacility(filter_facility)
    }

    //handles the facility options changes. 
    const handleFacility = (data) => {
        const selectedFacilityIds = Array.from(data, dt => +dt.value);
        setSelectedFacility(selectedFacilityIds)
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedFacility((prevFacility) => ({ ...prevFacility, [name]: value }));
    //     const selectedOptions = e.target.selectedOptions;
    //     const selectedRoles = Array.from(selectedOptions, (option) => option.value);
    //     setEditedFacility({ ...editedFacility, role: selectedRoles });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedFacility((prevFacility) => ({ ...prevFacility, [name]: value }));

        const selectedOptions = e.target.selectedOptions;
        if (selectedOptions) {
            const selectedRoles = Array.from(selectedOptions, (option) => option.value);
            setEditedFacility({ ...editedFacility, role: selectedRoles });
        }
    };

    const handleStateNameChange = (e) => {
        const { value } = e.target;
        setEditedFacility((prevFacility) => ({
            ...prevFacility,
            state: {
                ...prevFacility.state,
                stateName: value,
            },
        }));
    };



    const handleSave = () => {
        onSave(editedFacility);
    };

    return (
        <div className="modal modal-dialog modal-xl mt-3 d-block">
            <div className="modal-dialog mt-3">
                <div className="modal-content bg-light shadow bg-body">
                    <div className="modal-header p-0">
                        <h5 className="modal-title m-1">Edit Facility</h5>
                        <button type="button" className="btn btn-danger m-1" onClick={onClose}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>
                    <div className="modal-body">
                        <form method='POST'>
                            <div className="modal-body">
                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                        <label className="form-label fw-bold text-capitalize" htmlFor="stateNameInput">state name <i className={labelClassName}></i></label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                                            </div>
                                            <input
                                                id="stateNameInput"
                                                name="stateName"
                                                value={editedFacility.state.stateName}
                                                onChange={handleStateNameChange}
                                                type="text"
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                        <label className="form-label fw-bold text-capitalize" htmlFor="lgaNameInput">lga name <i className={labelClassName}></i></label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                                            </div>
                                            <input
                                                id="lgaNameInput"
                                                name="lgaName"
                                                value={editedFacility.lga.lgaName}
                                                onChange={handleChange}
                                                type="text"
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                        <label className="form-label fw-bold text-capitalize" htmlFor="nameInput">facility name <i className={labelClassName}></i></label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                                            </div>
                                            <input
                                                id="nameInput"
                                                name="name"
                                                value={editedFacility.name}
                                                onChange={handleChange}
                                                type="text"
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                        <label className="form-label fw-bold text-capitalize" htmlFor="datimcodeInput">datim code <i className={labelClassName}></i></label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                                            </div>
                                            <input
                                                id="datimcodeInput"
                                                name="datimcode"
                                                value={editedFacility.datimCode}
                                                onChange={handleChange}
                                                type="text"
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer p-0 d-flex justify-content-between">
                                <input type="reset" value="Close" onClick={onClose} className="btn btn-danger" data-bs-dismiss="modal" />
                                <button onClick={handleSave} type="button" className="btn btn-success">Save Facility</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
