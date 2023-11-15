"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

// LgasPage component
const LgasPage = () => {
    // State variable to manage the visibility of a section
    const [isShown, setIsShown] = useState(true);

    // Retrieve necessary data from sessionStorage and environment variable
    const bURL = process.env.baseURL;
    const {data:session} = useSession()
    const userData = session?.user;
    const loggeduserId = userData.id;
    const loggeduserState = userData.state;
    const loggeduserLga = userData.facility.lga.lgaName;
    const loggeduserFacility = userData.facility.name;

    // Event handler to toggle the visibility of a section
    const handleClick =( event) => {
        setIsShown(current => !current)
    }

    // Render the LgasPage component
    return (
        <div className="m-4">
            <div className="container-fluid">
                <div className="row row-cols-2,row-cols-3, auto,d-flex justify-content-center mt-2">
                    {/* Display a section with add and view buttons */}
                    <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-10 shadow-lg bg-body rounded mb-2`}>
                        <div className="d-flex justify-content-between p-2">
                            <button disabled onClick={handleClick} className="btn btn-dark text-capitalize" data-bs-toggle="modal" role="button"><i className="fa fa-plus" aria-hidden="true"></i> add new Lga</button>
                            <button className="btn btn-dark text-capitalize" role="button"><i className="fa fa-eye" aria-hidden="true"></i> View all LGA</button>
                        </div>
                    </div>

                    {/* Display a section with logged user LGA information */}
                    {isShown && (
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 shadow-lg bg-body rounded">
                            <div className="d-flex justify-content-between py-2">
                                <h3 className="text-capitalize">Logged user Lga</h3>
                                <div>
                                    <div className="input-group">
                                    </div>
                                </div>
                            </div>
                            {/* Display a table with logged user LGA information */}
                            <div className="tableFixHead mb-3">
                                <table className="table table-bordered table-hover table-condensed table-responsive col-lg-6 text-center" id="tab">
                                    <thead className="text-capitalize">
                                        <tr>
                                            <th className="th">state</th>
                                            <th className="th">lgaName</th>
                                            <th className="th">facility name</th>
                                            <th className="th">action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {/* Display the logged user LGA information in a row */}
                                        <tr key={loggeduserId}>
                                            <td>{loggeduserState}</td>
                                            <td>{loggeduserLga}</td>
                                            <td>{loggeduserFacility}</td>
                                            <td className="d-flex justify-content-evenly">
                                                <i className="btn mx-1 btn-primary btn-sm fa fa-pencil"></i> {/* Button for edit action */}
                                                <i className="btn mx-1 btn-danger btn-sm fa fa-trash"></i> {/* Button for delete action */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LgasPage;
