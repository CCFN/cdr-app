"use client"
import { useRouter } from 'next/navigation'
const MaintenancePage = () => {

    const router = useRouter();
    return (
        <div className="m-4">
            <div className="container-fluid">
                <div className="row row-cols-2,row-cols-3, auto,d-flex justify-content-center mt-2">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 border border-dark bg-light rounded mb-2">
                        <div className="d-flex justify-content-between p-2">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="drop-facility-data-tab" data-bs-toggle="pill" data-bs-target="#drop-facility-data" type="button" role="tab" aria-controls="drop-facility-data" aria-selected="true">Drop a facility</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="resolved-facility-data-tab" data-bs-toggle="pill" data-bs-target="#resolved-facility-data" type="button" role="tab" aria-controls="resolved-facility-data" aria-selected="false">Resolve Server</button>
                                </li>
                            </ul>
                            <button className="btn btn-dark text-capitalize" role="button"><i className="fa fa-tools" aria-hidden="true"></i> Maintenance</button>
                        </div>
                    </div>


                    <div className="tab-content col-xs-12 col-sm-12 col-md-10 col-lg-10 border border-dark bg-light rounded mb-4" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="drop-facility-data" role="tabpanel" aria-labelledby="drop-facility-data-tab">
                            <div className="p-2">
                                <div className="row mb-3">
                                    <div className="col-5">
                                        <label className="sr-only" htmlFor="usernameInput">state</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3"><i className="fa-solid fa-user"></i></div>
                                            </div>
                                            <input id="stateInput" name="state" type="text" className="form-control" placeholder="state" />
                                        </div>
                                    </div>

                                    <div className="col-5">
                                        <label className="sr-only" htmlFor="currentFacility">current facility</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3"><i className="fa-solid fa-user"></i></div>
                                            </div>
                                            <input id="currentFacility" name="currentFacility" type="text" className="form-control" placeholder="Current Facility" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="form-control btn btn-lg btn-danger">Drop Facility</button>
                                    </div>
                                </div>

                                <table className="table table-scroll table-striped table-hover t table-bordered">
                                    <thead className="text-center text-capitalize border border-dark mt-0 pt-0">
                                        <tr>
                                            <th className="th">state</th>
                                            <th className="th">current facility</th>
                                            <th className="th">action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center text-capitalize border border-dark">
                                        {/* <tr>
                                        <td>Abia</td>
                                        <td>federal medical center, umuahia</td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm" title="Delete">
                                                <i className="fa fa-trash" aria-hidden="true"></i> Confirm
                                            </button>
                                        </td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="tab-pane fade show" id="resolved-facility-data" role="tabpanel" aria-labelledby="resolved-facility-data-tab">
                            <div className="p-2">
                                <div className="row mb-3">
                                    <h3>resolve server data</h3>
                                    <div className="col-4">
                                        <label className="sr-only" htmlFor="usernameInput">Username</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3"><i className="fa-solid fa-user"></i></div>
                                            </div>
                                            <input id="usernameInput" name="username" type="text" className="form-control" placeholder="state" />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <label className="sr-only" htmlFor="usernameInput">missing facility</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3"><i className="fa-solid fa-user"></i></div>
                                            </div>
                                            <input id="usernameInput" name="username" type="text" className="form-control" placeholder="missing facility" />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <label className="sr-only" htmlFor="usernameInput">current facility</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text p-3"><i className="fa-solid fa-user"></i></div>
                                            </div>
                                            <input id="usernameInput" name="username" type="text" className="form-control" placeholder="current facility" />
                                        </div>
                                    </div>
                                    <div className="row my-3 justify-content-center text-center">
                                        <div class="col-6">
                                            <button type="button" className="form-control btn btn-lg btn-info">load linelist</button>
                                        </div>

                                        <div class="col-6">
                                            <button type="button" className="form-control btn btn-lg btn-secondary">load hts minually</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MaintenancePage;
