//import homeStyles from '../styles/Home.module.css'
export default function VlTable ({eligibleAbia,eligibleEnugu,eligibleImo,resultAbia,resultEnugu,resultImo,sampleAbia,sampleEnugu,sampleImo,suppressedAbia,suppressedEnugu,suppressedImo,unSuppressedAbia,unSuppressedEnugu,unSuppressedImo})  {
    
    return (
    <div className="col-lg-12 p-3">
        <table className="table table-bordered">
    <thead className="table-dark">
      <tr>
        <th scope="col">States</th>
        <th scope="col">Tx_Curr</th>
        <th scope="col">Eligible</th>
        <th scope="col">Samples</th>
        <th scope="col">Results</th>
        <th scope="col">Suppressed</th>
        <th scope="col">UnSuppressed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Abia</th>
        <td>60,000</td>
        <td>{eligibleAbia}</td>
        <td>{sampleAbia}</td>
        <td>{resultAbia}</td>
        <td>{suppressedAbia}</td>
        
        <td>{unSuppressedAbia}</td>

      </tr>
      <tr>
        <th scope="row">Enugu</th>
        <td>70,000</td>
        <td>{eligibleEnugu}</td>
        <td>{sampleEnugu}</td>
        <td>{resultEnugu}</td>
        <td>{suppressedEnugu}</td>
        
        <td>{unSuppressedEnugu}</td>
      </tr>
      <tr>
        <th scope="row">Imo</th>
        <td>65,000</td>
        <td>{eligibleImo}</td>
        <td>{sampleImo}</td>
       
        <td>{resultImo}</td>
        <td>{suppressedImo}</td>
        <td>{unSuppressedImo}</td>
      </tr>
    </tbody>
  </table> </div>)

} 
