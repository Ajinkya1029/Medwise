import React, {useState, useEffect } from "react";
import styles from '../../css/admincomponent.module.css';

function PatientList(){
    
    const [patList,setPatList]=useState([]);
    function fetchData(){
        const token=localStorage.getItem('token');
        fetch("http://localhost:1000/admin/patientlist",{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Accept":"application/json",
                "Authorization":token
            }
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                setPatList(data.list);
            }
        })
    }
    useEffect(()=>{
        fetchData();
    },[]);

    
    return <table className={styles.patienttable}>
        <thead>
            <tr>
                <th>Patient Name</th>
                <th>Dob</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>Doctors</th>
                
               

            </tr>
        </thead>
        <tbody>
        {patList.length!==0?patList.map((item,idx)=>(

<tr className={styles.patientlist} key={idx}>
<td>{item.name}</td>
<td>{item.dob}</td>
<td>{item.mobile}</td>
<td>{item.email}</td>
<td>{item.address}</td>
<td>{item.doctor.map((item,idx)=>(<p>{item.name}</p>))}</td>
</tr>
        )):<div>No Data</div>}
            
        </tbody>
    </table>
    
}
export default PatientList;