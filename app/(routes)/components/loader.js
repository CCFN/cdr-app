import "../../css/loader.css"
export const Loader = () =>{
    return(
        <div className="loader-div">
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
        </div>
    )
}

export const LoaderCover = () => {
    return(
        <div className="loading-cover">
            <Loader />
        </div>
    )
}