"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
function ViewUploads() {
    const baseURL = process.env.baseURL;
    const [locations, setLocations] = useState([]);
    const [fadata, setFadata] = useState([]);
    const {data: session} = useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);

    function getUniqueLocations(arr, key) {
      const map = new Map();
      return arr.reduce((uniqueArray, obj) => {
        const datimCodeValue = obj[key];
        const processedValue = obj.processed;
    
        // Check if the object is processed and has a unique datimCode
        if (processedValue === true && !map.has(datimCodeValue)) {
          map.set(datimCodeValue, true);
          uniqueArray.push(obj);
        }
    
        return uniqueArray;
      }, []);
    }
        //---- Load all Uploads-----
    const fetchUploads = async () =>{
        setLoading(true)
        await axios.get(baseURL + "batch/getuploads")
            .then((res) => {
              setLoading(false)
              const sorted = res.data.sort((a,b) => b.createdAt < a.createdAt ? -1 : 1)
              const uniqueLocations = getUniqueLocations(sorted, 'datimCode')
              setFadata(uniqueLocations);
              //console.log(sorted)
            });
    }

    const fetchLocations = async () =>{
      await axios.get(baseURL + "locations/all")
      .then(res => {
        const filteredLocations = res.data.filter(loc => loc.state.id !== '5ec2d6b79e427165ab7893da');
        console.log(filteredLocations)
        setLocations(filteredLocations)
      })
    }

    const getStateName = (datimCode) =>{
        const filteredLoc = locations.find(loc => loc.datimCode === datimCode);
        return filteredLoc?.state.stateName;
    }
    const getFacilityName = (datimCode) =>{
        const filteredLoc = locations.find(loc => loc.datimCode === datimCode);
        return filteredLoc?.name;
    }
        useEffect(() => {
          
          if(user){
            fetchLocations()
            fetchUploads()
          }
      }, [user]);

      function formatTimeAgo(dateString) {
        const now = new Date();
        const pastDate = new Date(dateString);
        const timeDifference = now - pastDate;
        
        if (timeDifference >= 24 * 60 * 60 * 1000) {
          const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          
          if(daysAgo > 0 && daysAgo < 4){
              return <span className="text-info">{daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</span>;
          }
          else if(daysAgo > 4 && daysAgo < 8){
            return <span className="warning1">{daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</span>;
          }
          else{
            return <span className="warning2">{daysAgo} day{daysAgo !== 1 ? 's' : ''} ago</span>;
          }
        } else {
          const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
          return <span className="text-success">{hoursAgo} hour{hoursAgo !== 1 ? 's' : ''} ago</span>;
        }
      }
  return (
    <div className="container mt-5 my-5">
        <h3 className="text-center">Facility Uploads</h3>
        <div className="mt-4 card shadow p-3 rounded">
        <div className="table-responsive">
          <table
            className="table 
                    table-hover	
                    table-bordered
                    align-middle"
          >
            <thead className="table-dark">
              <tr>
                <th>State Name</th>
                <th>Facility Name</th>
                <th>Last Upload</th>
                <th>Upload Status</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                loading &&
                <tr><td className="loading" colSpan={4}>Loading... please wait.</td></tr>
              }
              {fadata.map((file, index) => (
                <tr key={index}>
                  <td>{getStateName(file.datimCode)}</td>
                  <td>{getFacilityName(file.datimCode)}</td>
                  <td>{formatTimeAgo(file.createdAt)}</td>
                  <td>{file.status}</td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewUploads