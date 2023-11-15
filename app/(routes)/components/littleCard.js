
function LittleCard({title, icon, value}) {
  return (
    <div className='little-card'>
        <div className="fa_icon px-2">
            <i className={icon}></i>
        </div>
        <div className="fa_text">
            &nbsp;&nbsp;{title}: <b>{value}</b>
        </div>
    </div>
  )
}

export default LittleCard