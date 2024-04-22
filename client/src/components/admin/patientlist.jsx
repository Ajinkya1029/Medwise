import React, {useState, useEffect } from "react";
import styles from '../../css/admincomponent.module.css';
function PatientList(){
    const [patlist,setPatList]=useState([]);

    useEffect(()=>{
        const token=localStorage.getItem('token');
        fetch('http://localhost:1000/admin/patientlist',{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Accept":"application/json",
                "Authorization":`${token}`
            }
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                console.log(data.list);
                
setPatList(data.list);
            }
        })
    })
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
            {patlist.map((item,idx)=>(
                <tr key={idx}>
               <th>{item.name}</th>
               <th>{item.dob}</th>
               <th>{item.mobile}</th>
               <th>{item.email}</th>
               <th>{item.address}</th>
               <th>{item.doctor}</th>
        
            </tr>
            ))}
            
        </tbody>
    </table>
    
}
export default PatientList;