import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';
import AssociateDoctor from "./associatedoctor";
import LoginHandler from '../general/login';
import MedicalHistory from "./medicalhistory";
function PatientDashBoard(props){
    const [component,setComponent]=useState(null);
    const [list,setList]=useState([]);
    const navigate=useNavigate();
    function getData(){
        const token=localStorage.getItem('token');
        fetch('http://localhost:1000/patient/patientsdoctor',{
            method:"GET",
            headers:{
                'Authorization':`${token}`,
                'Content-Type':'application/json',
                Accept:'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                console.log(data.List);
    setList(data.List);
            }else{
                console.log("Failed to fetch");
            }
        }).catch(err=>{
            console.log(err);
        })
     }
    
    function HandleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
         }
         function render(e){
          
if(e.target.name==="vdoctor"){
    if(list){
        setComponent(<AssociateDoctor list={list}></AssociateDoctor>)

    }else{
        setComponent(<div>No Data</div>)
    }
}else if(e.target.name==="medhistory"){
setComponent(<MedicalHistory></MedicalHistory>)
}

         }
         useEffect(()=>{
            getData();
         },[]);
    return <> 
    <div className={styles.tab}>
    <Link name="vdoctor" onClick={render} className={styles.link}>View Doctors</Link>
    <Link name="appoint" onClick={render} className={styles.link}>View Appointments</Link>
    <Link name="medhistory" onClick={render} className={styles.link}>View Medical History</Link>
    <Link onClick={HandleLogout} className={styles.link} >Logout</Link>
</div>
<div>{component}</div>
</>
}
export default PatientDashBoard;