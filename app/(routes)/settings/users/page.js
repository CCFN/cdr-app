"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import "../assets/css/users.css";
import axios from 'axios';
import { useSession } from 'next-auth/react';

const UsersPage = () => {
    // State variables to manage the component's behavior
    const [isShown, setIsShown] = useState(true); // Controls the visibility of the "CreateUser" modal
    const [searchTerm, setSearchTerm] = useState(''); // Holds the search term entered by the user
    const [editingUser, setEditingUser] = useState(null); // Holds the user object being edited
    const [columnClassName, setColumnClassName] = useState('d-block'); // Manages the CSS class for a column element
    const [loading, setLoading] = useState(false)
    // State variable to store the list of users fetched from the server
    const [users, setUsers] = useState([]);

    // Fetch user data from the server when the component mounts
    const base_url = process.env.baseURL; // The base URL for API requests
    const {data: session} = useSession();
    const user = session?.user;

    useEffect(() => {
        // Fetch user data from the server and update the state
        if(user){
            try {
                setLoading(true)
                axios.get(`${base_url}user`)
                .then((response) => {
                    setUsers(response.data);
                    setLoading(false)
                });
            } catch (e) {
                console.log(e);
            }

        }
    }, [user]);

    // Event handler to update the search term state when the user enters a search query
    const handleSearch = (e) => { setSearchTerm(e.target.value) };

    // Event handler to start the user edit process
    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditingUser(userToEdit);
        setIsShown(current => !current);
        setColumnClassName('d-none');
    };

    // Event handler to save the edited user data
    const handleSaveEdit = (editedUser) => {
        // Update the user data with the edited user
        const updatedUsers = users.map((user) => user.id === editedUser.id ? editedUser : user);
        setUsers(updatedUsers);
        setEditingUser(null);
        setIsShown(current => !current);
        setColumnClassName('d-block');
    };

    // Event handler to cancel the user edit process
    const handleCancelEdit = () => {
        setEditingUser(null);
        setIsShown(current => !current);
        setColumnClassName('d-block');
    };

    // Event handler to delete a user
    const handleDelete = (id) => {
        // Implement your delete logic here
        if (window.confirm(`Delete the user?`)) {
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
        }
    };

    // Filter users based on the search term entered by the user
    // const filteredUsers = users.filter((user) => {
    //     const lowercaseSearchTerm = searchTerm.toLowerCase();
    //     return (
    //         user.username.toLowerCase().includes(lowercaseSearchTerm) ||
    //         user.fullName.toLowerCase().includes(lowercaseSearchTerm) ||
    //         user.email.toLowerCase().includes(lowercaseSearchTerm) ||
    //         (user.state?.stateName?.toLowerCase().includes(lowercaseSearchTerm) || false) ||
    //         (user.facility?.name?.toLowerCase().includes(lowercaseSearchTerm) || false) ||
    //         (user.roles && user.roles.some(role => role.toLowerCase().includes(lowercaseSearchTerm)))
    //     );
    // });

    // Event handler to toggle the visibility of the "CreateUser" modal
    const handleClick = event => {
        setIsShown(current => !current)
    }

    // Return the JSX elements to be rendered in the component
    return (
        <div className="m-4">
            <div className="container-fluid">
                <div className="row row-cols-2,row-cols-3, auto,d-flex justify-content-center mt-2">
                    {/* If the "editingUser" state is not null, show the "EditUser" component */}
                    {editingUser && (<EditUser user={editingUser} onSave={handleSaveEdit} onClose={handleCancelEdit} />)}

                    <div className={`${columnClassName} col-xs-12 col-sm-12 col-md-12 col-lg-10 shadow-lg bg-body rounded mb-2`}>
                        <div className="d-flex justify-content-start p-2">
                            {/* Button to open the "CreateUser" modal */}
                            <button onClick={handleClick} className="btn btn-dark text-capitalize" data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button"><i className="fa fa-plus" aria-hidden="true"></i> create new users</button>
                        </div>
                        {/* "CreateUser" modal */}
                        <CreateUser handleClick={handleClick} />
                    </div>

                    {isShown && (<div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 shadow-lg bg-body rounded">
                        <div className="d-flex justify-content-between py-2">
                            <h3 className="text-capitalize">users list</h3>
                            <div>
                                <div className="input-group">
                                    {/* Input field for user search */}
                                    <input className="form-control border border-dark btn-outline-success shadow-none rounded-0 fw-bold" type="text" value={searchTerm} onChange={handleSearch} placeholder="Enter search term" />
                                </div>
                            </div>
                        </div>
                        <div className="tableFixHead mb-3">
                            {/* Table displaying the filtered users */}
                            <table className="table table-bordered table-hover table-condensed table-responsive col-lg-6" id="tab">
                                <thead className="text-capitalize">
                                    <tr>
                                        <th className="th">sn</th>
                                        {/* <th className="th">id</th> */}
                                        <th className="th">username</th>
                                        <th className="th">email</th>
                                        <th className="th">full name</th>
                                        <th className="th">state</th>
                                        <th className="th">facility</th>
                                        <th className="th">role</th>
                                        <th className="th">action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {/* Render filtered users or show a message if no results found */}
                                    {users.length < 1 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center text-danger fw-bold">
                                                
                                                {loading ? "Loading...Please Wait." : `${searchTerm} Not Found`}
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                {/* <td>{user.id}</td> */}
                                                <td>{user.username ? user.username : ""}</td>
                                                <td>{user.email ? user.email : ""}</td>
                                                <td>{user.fullName ? user.fullName : ""}</td>
                                                <td>{user.state ? user.state.stateName : ""}</td>
                                                <td>{user.facility ? user.facility.name : ""}</td>
                                                <td>{user.roles ? user.roles.join(', ') : ''}</td>
                                                <td className="d-flex">
                                                    {/* Buttons for user edit and delete */}
                                                    <i onClick={() => handleEdit(user.id)} className="btn mx-1 btn-outline-primary btn-sm fa fa-pencil"></i>
                                                    <i onClick={() => handleDelete(user.id)} className="btn mx-1 btn-outline-danger btn-sm fa fa-trash"></i>
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

export default UsersPage;
