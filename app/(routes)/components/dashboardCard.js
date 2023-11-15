export default function DashboardCard(
    {iconName, 
    upper_indicator, 
    upper_value, 
    lower_indicator, 
    lower_value}){
        return(
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 mx-2 my-3 dashboard-card px-3 py-3">
                <div className="dashboard-card-top p-3">
                    <div className="dashboard-icon text-center">
                        <i className={iconName}></i>
                    </div>
                    <div className="text-right">
                        <p className="h6 upper-indicator">{upper_indicator}</p>
                        <p className="h6 upper-value fw-bold">{upper_value?.toLocaleString()}</p>
                    </div>
                </div>
                <div className="dashboard-card-bottom py-4">
                    <span className="card-bottom-left-text">{lower_indicator}</span>
                    <span className="card-bottom-right-text">{(lower_value/upper_value * 100).toFixed(1)}%</span>
                </div>
                
                
            </div>
        )
}