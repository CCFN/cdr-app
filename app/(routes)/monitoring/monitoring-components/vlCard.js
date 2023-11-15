export default function ViralLoadCard({iconType, 
  upper_indicator, 
  upper_value, 
  }){

      return(
          <div className="col-xs-12 col-sm-12 col-md-2 col-lg-1 vl-card px-0 py-0">
          <div style={{textAlign:"center"}}><p style={{fontSize:"17px",fontWeight:"bold",paddingTop:"7px",color:"darkRed",textAlign:"center"}}>{upper_indicator}</p></div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between",backgroundColor:"	#dadada",width:"100%",height:"55px",borderRadius:"10px"}}>
              <p style={{fontSize: "20px", fontWeight: "600" ,fontSize:"25px",paddingLeft:"35px",paddingTop:"15px",color:"#4e0e47"}}>{upper_value}</p>
              <i className={iconType}></i>
          </div>
             
          </div>
      )
}