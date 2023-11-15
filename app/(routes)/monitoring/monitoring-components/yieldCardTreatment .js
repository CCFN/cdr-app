
import { Circle } from "rc-progress"

export default function YieldCardTreatment  ({iconType, 
    upper_indicator, 
    upper_value, 
    lower_indicator, 
    percentage_achieved}){
        
        return(
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2  monitoring-card px-0 py-0">
            <div className="yield-card-top-treatment p-1">
            <div className=""><p>{upper_indicator}</p></div>
               
               <div className="yield_bar">
                   <div className="container2">
                   <div className="inner4">
                    <p style={{fontSize:"23px",fontWeight:"bold"}}>{percentage_achieved}%</p></div>
                       
                       <div className="inner5"><Circle percent={percentage_achieved}
               strokeColor="#ff2a26"
               strokeWidth={7}
               trailColor="#FFCCCB"
               trailWidth={7}
               strokeLinecap="round" /></div>
   
                   </div>
                  
   
                  
               
               
               </div>

            </div>
            
            
            </div>
        )
}