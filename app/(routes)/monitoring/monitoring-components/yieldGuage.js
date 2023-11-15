
import { Circle } from "rc-progress"
import AnimatedGuage from "./animatedGuage"

export default function YieldGuage({iconType, 
    upper_indicator, 
    upper_value, 
    lower_indicator, 
    percentage_achieved}){
        
        return(
            <AnimatedGuage yield_value={percentage_achieved} ></AnimatedGuage>
            // <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4  monitoring-card">
                
            // </div>
                 )
}