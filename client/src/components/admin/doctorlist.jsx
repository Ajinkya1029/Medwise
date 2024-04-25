import React, {useState, useEffect } from "react";
import styles from '../../css/admincomponent.module.css';

function DoctorList(){
    
    const [patList,setPatList]=useState([]);
    function fetchData(){
        const token=localStorage.getItem('token');
        fetch("http://localhost:1000/admin/doctorlist",{
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
                <th>Doctor Name</th>
                <th>Dob</th>
                <th>Mobile</th>
                <th>Email</th>
                
                
               

            </tr>
        </thead>
        <tbody>
        {patList.length!==0?patList.map((item,idx)=>(

<tr className={styles.patientlist} key={idx}>
<td>{item.name}</td>
<td>{item.dob}</td>
<td>{item.mobile}</td>
<td>{item.email}</td>


</tr>
        )):<div>No Data</div>}
            
        </tbody>
    </table>
    
}
export default DoctorList;