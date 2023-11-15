export default function LocationCard({iconType, 
  upper_indicator, 
  upper_value, 
  }){

      return(
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 location-card px-1 py-">
          <div style={{textAlign:"center"}}><p style={{fontSize:"15px",color:"white",paddingTop:"1px",fontWeight:"bold",textAlign:"center"}}>{upper_indicator}</p></div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between",backgroundColor:"white",width:"100%",height:"30px",borderRadius:"10px"}}>
              <p style={{fontSize: "20px", fontWeight: "600" ,fontSize:"25px",paddingLeft:"105px",paddingBottom:"10px",color:"#4e0e47"}}>{upper_value}</p>
              <i className={iconType}></i>
          </div>
             
          </div>
      )
}