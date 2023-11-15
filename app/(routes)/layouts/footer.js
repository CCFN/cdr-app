import Link from "next/link";

export default function Footer(){
    return(
        <div className="container-fluid">
        <footer className="row text-bg-dark py-3">
            <div className="col-sm-5 text-center footer-links">
                <Link href="/history">History</Link> 
                <Link href="/docs">Docs</Link>
            </div>
            <div className="col-sm-7">
                &copy; 2023 Caritas Nigeria
            </div>
        </footer>
        </div>
    )
}