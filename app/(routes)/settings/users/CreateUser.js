import { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import "../assets/css/users.css";
import axios from 'axios';
import { lga } from "../assets/data/facilityList";
import { useSession } from "next-auth/react";

const CreateUser = ({ handleClick }) => {
    // State variables for managing user inputs and API data
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [apiLocations, setApiLocations] = useState([]);
    const [apiLgas, setApiLgas] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [facility, setFacility] = useState([])
    const { data: session } = useSession();
    const user = session?.user;
    // New state for the selected facility
    const [selectedFacility, setSelectedFacility] = useState(null); // Initialize to null or a default value if needed

    // Base URL and user authentication token from session storage
    const baseURL = process.env.baseURL;
    
    const fetchStates = () =>{
        try {
                axios.get(`${baseURL}state/`)
                .then(res =>{
                    setStates(res.data);
                    console.log(res.data)
                })
            
        } catch (error) {
            console.log(error)
        }

    }

    // Fetch locations from the API using useEffect
    useEffect(() => {
        // const fetchLocations = async () => {
        //     try {
        //         const response = await axios.get(`${bURL}locations/all`);
        //         setApiLocations(response.data);
        //     } catch (error) {
        //         console.error('Error fetching locations:', error);
        //     }
        // };
        // fetchLocations();
        if(user){

            fetchStates();
        }
       
    }, [user]);

    // Options for user roles in a dropdown menu. remember to fetch this from the api
    const roleOptions = [
        { value: "ROLE_MEA", label: "ROLE_MEA" },
        { value: "ROLE_USER", label: "ROLE_USER" },
        { value: "ROLE_MODERATOR", label: "ROLE_MODERATOR" },
        { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
        { value: "ROLE_SUPER_ADMIN", label: "ROLE_SUPER_ADMIN" },
    ];

    // Function to handle changes in the user role selection, works for select elements
    const handleSelectChange = (selectedOptions) => {
        setSelectedRoles(selectedOptions.map(option => option.value));
    };

    // Function to handle changes in user inputs like state, LGA, and password
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Mapping between states and their corresponding LGAs, i prefer to map it manually now
        const stateLgaMap = {
            '61af6942d5cf1f7ad97f559a': [0, 17], // Abia
            '5ec2d6459e427165ab7893d8': [18, 31], // Enugu
            '5ec2d6ca9e427165ab7893db': [32, 53], // Imo
        };

        if (name === 'state') {
            setSelectedState(value);
            if (stateLgaMap.hasOwnProperty(value)) {
                const [start, end] = stateLgaMap[value];
                const selectedLgas = lga.slice(start, end);
                setApiLgas(selectedLgas);
            } else {
                setApiLgas([]);
            }
        }
    };

    // Function to handle user creation when the form is submitted
    const handleCreateUser = async (e) => {
        e.preventDefault();

        // Extracting user input data from the form
        const username = e.target.username.value;
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Finding the selected state object from the API data
       // const selectedStateObject = apiLocations.find(item => item.state.id === selectedState);

        // Creating a new user object with the provided data
        const createdUser = {
            "email": email,
            "enabled": true,
            "facility": selectedStateObject.id,
            "fullName": fullName,
            "password": password,
            "role": [],
            "roles": selectedRoles,
            "state": selectedStateObject.state.id,
            "username": username
        };

        // console.log(createdUser); // log it to see if everything will be sent to the backend as expected

        try {
            // Sending the new user data to the API for user creation
            await axios.post(bURL + 'auth/signup', createdUser);
            window.alert('New user has been created');
            // window.location.reload(); // there should be a better way to reload the page
            console.log(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);
            window.alert(`${error.code} (${error.message}) (${error.response?.data?.message})`);
        }
    };

    // Mapping of state IDs to their corresponding abbreviations
    const stateAbbreviations = {
        "61af6942d5cf1f7ad97f559a": "Abia",
        "5ec2d6459e427165ab7893d8": "Enugu",
        "5ec2d6ca9e427165ab7893db": "Imo",
        // Add other state abbreviations and their full names here, caritas is currently in 3 states now (august 2023)
    };

    // The JSX code for the user creation form
    return (
        // Modal for creating a new user
        <div className="modal fade modal-dialog modal-xl mt-0" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog mt-0">
                <div className="modal-content bg-light shadow-lg bg-body">
                    {/* Form for user creation */}
                    <form onSubmit={handleCreateUser}>
                        <div className="modal-body">
                            <div className="row">
                                {/* Username input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="usernameInput">Username</label>
                                    <input id="usernameInput" name="username" required type="text" className="form-control border border-dark shadow-none" placeholder="Username" />
                                </div>
    
                                {/* Full Name input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="fullNameInput">Full Name</label>
                                    <input id="fullNameInput" name="fullName" required type="text" className="form-control border border-dark shadow-none" placeholder="Full Name" />
                                </div>
    
                                {/* Email input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="emailInput">Email</label>
                                    <input id="emailInput" name="email" required type="email" className="form-control border border-dark shadow-none" placeholder="Email" />
                                </div>
    
                                {/* State selection */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="stateInput">State Name</label>
                                    <select className="form-control border border-dark shadow-none" name="state"  onChange={handleInputChange}>
                                        <option value="">Select State</option>
                                        {
                                            //states.length > 0 ? 
                                            states.map((state, index) =>{
                                                <option key={index} value={state.id}>{state.stateName}</option>
                                            })
                                            //: <option>No States loaded</option>
                                        }
                                        {/* Add other state options */}
                                    </select>
                                </div>
    
                                {/* LGA selection */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="lgaInput">LGA Name</label>
                                    <select className="form-control border border-dark shadow-none" name="lga" id="lgaInput" onChange={handleInputChange}>
                                        <option value="" defaultValue>Select LGA</option>
                                        {apiLgas.map((item) => (
                                            <option key={item.value} value={item.label}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
    
                                {/* Facility selection */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="facilityInput">Facility Name</label>
                                    <Select
                                        className=""
                                        name="facility"
                                        id="facilityInput"
                                        options={apiLocations.filter(
                                            (location) => location.state.id === selectedState
                                        )}
                                        onChange={(selectedOption) => {
                                            setSelectedFacility(selectedOption); // Update the selected facility
                                            setSelectedState(selectedOption ? selectedOption.state.id : ""); // Update the selected state if needed
                                        }}
                                        value={selectedFacility}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        placeholder="Select facility Id"
                                    />
    
                                </div>
    
                                {/* User role selection */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="roleInput">Role</label>
                                    <Select
                                        className=""
                                        isSearchable={true}
                                        name="role"
                                        options={roleOptions}
                                        isMulti
                                        onChange={handleSelectChange}
                                        placeholder="Select User Role"
                                    />
                                </div>
    
                                {/* Password input */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                                    <label className="form-label fw-bold text-capitalize mb-0" htmlFor="passwordInput">Password</label>
                                    <input id="passwordInput" name="password" onChange={handleInputChange} type="password" className="form-control border border-dark shadow-none" placeholder="Password" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer p-0 d-flex justify-content-between">
                            {/* Close button */}
                            <input type="reset" value="Close" onClick={handleClick} className="btn btn-danger" data-bs-dismiss="modal" />
                            {/* Save User button */}
                            <button type="submit" className="btn btn-success">Save User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default CreateUser;