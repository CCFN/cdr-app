import MapChart from "../../components/mapChart";



export default function PieCard({indicator, description,chartType
    }){
        
        return(
            <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 mx-9 my-3 pie-card px-0 py-0">
                <div>
                <span className="hts_text_graph">{indicator}<span className="by_sex_text_graph"> {description}</span></span>
                    {/* {chartType} */}
                    <MapChart />
                </div>
            
               
            </div>
        )
}