
import { ST } from "next/dist/shared/lib/utils"
import '../monitoring-css/monitoring-style.css'

export default function GraphCard({indicator, description,chartType
    }){
        
        return(
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mx-4 my-3 graph-card1 px-3 py-3">
                <div>
                <span className="hts_text_graph">{indicator}<span className="by_sex_text_graph"> {description}</span></span>
                  
                  {chartType}

                   
                    
                </div>
            
               
            </div>
        )
}