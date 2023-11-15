
import { Circle } from "rc-progress"

export default function YieldCard({iconType, 
    upper_indicator, 
    upper_value, 
    lower_indicator, 
    percentage_achieved}){
        
        return(
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4  monitoring-card px-3 py-0">
            <div className="yield-card-top p-3">
            <div className=""><p>{upper_indicator}</p></div>
               
               <div className="yield_bar">
                   <div className="container2">
                   <div className="inner2"><h3>{percentage_achieved}%</h3></div>
                       
                       <div className="inner3"><Circle percent={percentage_achieved}
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