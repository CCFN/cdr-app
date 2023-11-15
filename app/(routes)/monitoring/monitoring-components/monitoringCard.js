export default function MonitoringCard({iconType, 
    upper_indicator, 
    upper_value, 
    lower_indicator, 
    percentage_achieved}){

        return(
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 monitoring-card px-3 py-3">
            <div><p>{upper_indicator}</p></div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                <p style={{fontSize: "20px", fontWeight: "600" ,fontSize:"25px"}}>{upper_value}</p>
                <i className={iconType}></i>
            </div>
               
            </div>
        )
}

// import React from 'react'

// const MonitoringCard=({iconType, 
//         upper_indicator, 
//         upper_value, 
//         lower_indicator, 
//         percentage_achieved})=>{
//   return (
// <div className="container-lg">
//   <div className="row row-cols-lg-5 g-4 p-4">

// <div className="bg-white d-flex justify-content-between w-100 border p-4 rounded-lg">
//     <div className="d-flex flex-column w-100 pb-4">
//         <p className='font-weight-bold'>HTS Name</p>
//         <p className='font-weight-bold'>HTS Name</p>

//     </div>
//     </div>
// {/* <div class="col-lg-2 col-1 bg-white d-flex justify-content-between w-100 border p-4 rounded-lg"></div>
// <div class="bg-white d-flex justify-content-between w-100 border p-4 rounded-lg"></div>
//      */}
//   </div>
// </div>
//   )
// }

// export default MonitoringCard