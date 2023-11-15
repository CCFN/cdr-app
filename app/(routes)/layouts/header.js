'use client'
import Link from "next/link"
import { useEffect, useState } from "react";
//import { LoaderCover } from "../components/loader";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header(){
    const { data:session } = useSession();
    //console.log(session)
    const user = session?.user;
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    useEffect(() =>{
        import('../../../public/vendor/bootstrap/js/bootstrap.bundle').then((bootstrap) =>{
            const dropdownElement = document.getElementById('myDropDown');
            const dropdown = new bootstrap.Dropdown(dropdownElement);
            return() =>{
                dropdown.dispose();
            }
        })
    },[])

    return(
        <>
        {/* {
            loading &&
            <LoaderCover /> */
        }  
        <nav className="navbar navbar-expand-lg  main-navbar sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/dashboard">
                    <img src="/images/ccfn-logo.png" alt="CCFN Logo" className="logo"/>
                </Link>
                <button className="navbar-toggler" id="myDropDown" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="/dashboard"><i className="fa fa-home"></i></Link>
                    </li>
                   
                    <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Monitoring
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="/monitoring/hts">HTS</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/treatment">Treatment</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/vl">VL</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/pmtct">PMTCT</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/recency">Recency</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/ncd">NCD</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/biometrics">Biometrics</Link></li>
                        <li><Link className="dropdown-item" href="/monitoring/ovc">OVC</Link></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" href="/reporting">
                        Reporting
                    </Link>
                    </li>
                    {
                        ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_MEA'].some(role => user?.roles.includes(role)) &&
                        <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Uploads
                        </Link>
                            <ul className="dropdown-menu">
                                <li>
                                <Link className="dropdown-item" href="/uploads/new-upload">New Uploads</Link>
                                </li>
                                <li>
                                <Link className="dropdown-item" href="/uploads/view-uploads">View Uploads</Link>
                                </li>

                            </ul>
                        </li>
                    }
                    {
                        ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'].some(role => user?.roles.includes(role)) &&
                        <li className="nav-item dropdown">
                                <Link href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Settings</Link>
                                <ul className="dropdown-menu dropdown-menu-end text-capitalize">
                                    <li><Link href="/settings/users" className="dropdown-item fw-bold"><i className="fa fa-users" aria-hidden="true"></i> users</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/facilities" className="dropdown-item fw-bold"><i className="fa fa-building" aria-hidden="true"></i> facilities</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/profile" className="dropdown-item fw-bold disabled"><i className="fa-solid fa-user" aria-hidden="true"></i> profile</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/password" className="dropdown-item fw-bold "><i className="fa-solid fa-key" aria-hidden="true"></i> password</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/lgas" className="dropdown-item fw-bold "><i className="fa-brands fa-slack"></i> lgas</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/state" className="dropdown-item fw-bold "><i className="fa-solid fa-circle-up"></i> state</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/roles" className="dropdown-item fw-bold"><i className="fa-solid fa-repeat"></i> roles</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link href="/settings/maintenance" className="dropdown-item fw-bold fw-bold"><i className="fa-solid fa-screwdriver-wrench"></i> maintenance</Link></li>
                                    {/*<div className="dropdown-divider"></div>
                                    <li><Link href="/settings/metadata" className="dropdown-item fw-bold disabled"><i className="fa-solid fa-database"></i> metadata</Link></li>
                                    <div className="dropdown-divider"></div>
                                    <Link href="#" role="button" className="dropdown-item fw-bold" onClick={logout}><i className="fa-solid fa-power-off"></i> Logout</Link>*/}
                                </ul>
                        </li>
                        
                    }
                    <li className="nav-item">
                        <Link className="nav-link" role="button" href="#" onClick={() => signOut()}>Logout <i className="fa-solid fa-right-from-bracket"></i></Link>
                    </li>
                    
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}