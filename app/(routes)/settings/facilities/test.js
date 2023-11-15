"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import EditFacility from './EditFacility';
import CreateFacility from './CreateFacility';
import Select from 'react-select';
import "../assets/css/facilities.css";
import allFacilityData from "./data.json"
import axios from 'axios';
import { headers } from 'next/dist/client/components/headers';

const FacilitiesPage = () => {
    const router = useRouter();
    const [isShown, setIsShown] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingFacility, setEditingFacility] = useState(null);
    const [columnClassName, setColumnClassName] = useState('d-block');
    const [selectedOptions, setSelectedOptions] = useState({});

    const [inputClassName, setInputClassName] = useState('form-control border border-dark shadow-none');
    const [labelClassName, setLabelClassName] = useState('d-none');

    const [facilities, setFacilities] = useState([]);
    const bURL = process.env.baseURL;
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    // const token = userData.accessToken;

    useEffect(() => {
        try {
            axios.get(bURL + "locations/248")
                .then((response) => {
                    setFacilities(response.data);
                    //console.log(facilities);
                });
        } catch (e) {
            console.log(e);
            //console.log(facilities);
        }
    }, []);

    console.log(allFacilityData);

    const roleOptions = [{ value: 'ROLE_USER', label: 'ROLE_USER' }, { value: 'ROLE_MODERATOR', label: 'ROLE_MODERATOR' }, { value: 'ROLE_ADMIN', label: 'ROLE_ADMIN' }, { value: 'ROLE_SUPER_ADMIN', label: 'ROLE_SUPER_ADMIN' }];
    const [newFacility, setNewFacility] = useState({ facilityname: "", fullName: "", email: "", state: {}, role: [], password: "" });

    const handleCreateFacility = (e) => {
        e.preventDefault();

        const requiredFields = ['facilityname', 'fullName', 'email', 'state', 'password'];
        if (!validateRequiredFields(requiredFields)) {
            setLabelClassName('d-inline text-danger fa-solid fa-xmark');
            return;
        }

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

        axios
            .post(bURL + 'auth/signup', createdFacility)
            .then((response) => {
                window.alert('New facility has been created');
            })
            .catch((error) => {
                console.error('Error creating facility:', error.message);
            });
    };

    const validateRequiredFields = (requiredFields) => {
        for (const field of requiredFields) {
            if (newFacility[field].trim() === '' || newFacility[field].trim() === [] || newFacility[field].trim() === {}) {
                return false;
            }
        }
        return true;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFacility((prevFacility) => ({ ...prevFacility, [name]: value }));
    };

    const handleSelectChange = (selected) => {
        const selection = Array.from(selected, sl => sl.value);
        setSelectedOptions(selection);
    };

    const handleSearch = (e) => { setSearchTerm(e.target.value) };

    const handleEdit = (id) => {
        const facilityToEdit = facilities.find((facility) => facility.id === id);
        setEditingFacility(facilityToEdit);
        setIsShown(current => !current);
        setColumnClassName('d-none');
    };

    const handleSaveEdit = (editedFacility) => {
        // Update the facility data with the edited facility
        const updatedFacilities = facilities.map((facility) => facility.id === editedFacility.id ? editedFacility : facility);
        setFacilities(updatedFacilities);
        setEditingFacility(null);
        setIsShown(current => !current);
        setColumnClassName('d-block');
    };

    const handleCancelEdit = () => {
        setEditingFacility(null);
        setIsShown(current => !current);
        setColumnClassName('d-block');
    };

    const handleDelete = (id) => {
        // Implement your delete logic here
        if (window.confirm(`Delete the facility?`)) {
            const updatedFacilities = facilities.filter((facility) => facility.id !== id);
            setFacilities(updatedFacilities);
        }
    };

    const handleClick = event => { setIsShown(current => !current) }
    return (
        <div className="m-4">
            <div className="container-fluid">
                <div className="row row-cols-2,row-cols-3, auto,d-flex justify-content-center mt-2">
                    {editingFacility && (<EditFacility facility={editingFacility} onSave={handleSaveEdit} onClose={handleCancelEdit} />)}
                    <div className={`${columnClassName} col-xs-12 col-sm-12 col-md-10 col-lg-10 shadow-lg bg-body rounded mb-2`}>
                        <div className="d-flex justify-content-start p-2">
                            <button onClick={handleClick} className="btn btn-dark text-capitalize" data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button"><i className="fa fa-plus" aria-hidden="true"></i> create new facilities</button>
                        </div>

                        {/* <!-- Modal --> */}
                        <div className="modal fade modal-dialog modal-xl mt-0" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel">
                            <div className="modal-dialog mt-0">
                                <div className="modal-content bg-light shadow-lg bg-body">
                                    <form method='POST'>
                                        <div className="modal-body">
                                            <div className="row">

                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <label className="form-label fw-bold text-capitalize" htmlFor="facilitynameInput">Facilityname <i className={labelClassName}></i></label>
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text p-3 border border-dark rounded-0">
                                                                <i className="fa-solid fa-facility h5 mt-2 fa-2xl"></i>
                                                            </div>
                                                        </div>
                                                        <input id="facilitynameInput" name="facilityname" required onChange={handleInputChange} type="text" className={inputClassName} placeholder="Facilityname" />
                                                    </div>
                                                </div>

                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <label className="form-label fw-bold text-capitalize" htmlFor="fullNameInput">Full Name <i className={labelClassName}></i></label>
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-person p-0 h5 mt-2 fa-2xl"></i></div>
                                                        </div>
                                                        <input id="fullNameInput" name="fullName" required onChange={handleInputChange} type="text" className={inputClassName} placeholder="Full Name" />
                                                    </div>
                                                </div>

                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <label className="form-label fw-bold text-capitalize" htmlFor="emailInput">Email <i className={labelClassName}></i></label>
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-envelope p-0 h5 mt-2 fa-2xl"></i></div>
                                                        </div>
                                                        <input id="emailInput" name="email" required onChange={handleInputChange} type="email" className={inputClassName} placeholder="Email" />
                                                    </div>
                                                </div>

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

                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <label className="form-label fw-bold text-capitalize" htmlFor="roleInput">Role <i className={labelClassName}></i></label>
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text p-3 border border-dark rounded-0"><i className="fa-solid fa-unlock-keyhole p-0 h5 mt-2 fa-2xl"></i></div>
                                                        </div>
                                                        <Select className={inputClassName} isSearchable="true" name="role" options={roleOptions} isMulti onChange={handleSelectChange} placeholder="Select Facility Role" />
                                                    </div>
                                                </div>

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
                                        <div className="modal-footer p-0 d-flex justify-content-between">
                                            <input type="reset" value="Close" onClick={handleClick} className="btn btn-danger" data-bs-dismiss="modal" />
                                            <button onClick={handleCreateFacility} type="button" className="btn btn-success">Save Facility</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    {facilities.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center text-danger text-lowercase fw-bold">{searchTerm} not found</td>
                                        </tr>
                                    ) : (
                                        <tr key={facilities.id}>
                                            <td>{facilities.id}</td>
                                            <td>{facilities.name}</td>
                                            <td>{facilities.state.stateName}</td>
                                            <td>{facilities.lga.lgaName}</td>
                                            <td>{facilities.datimCode}</td>
                                            <td className="d-flex">
                                                <i onClick={() => handleEdit(facilities.id)} className=" btn mx-1 btn-primary btn-sm fa fa-pencil"></i>
                                                <i onClick={() => handleDelete(facilities.id)} className="btn mx-1 btn-danger btn-sm fa fa-trash"></i>
                                            </td>
                                        </tr>
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