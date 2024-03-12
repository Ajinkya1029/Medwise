import React,{useState} from "react";
import {useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from "../components/general/navbar";
import PatientDashBoard from "../components/patient/patientdashboard";
import DoctorDashBoard from "../components/doctor/doctordashboard";
import AdminDashBoard from "../components/admin/admindashboard";
import styles from '../css/profile.module.css';

function ProfilePage(){
    let data;


 const [id,setId]=useState("");
 const [list,setList]=useState([]);
 const [roles,setRoles]=useState("");
 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
   
    setId(decoded.name);
    setRoles(decoded.roles)
    console.log(roles)
  }
 
 },[]);
 switch(roles){
    case 'patient': 
    data=<PatientDashBoard></PatientDashBoard>
    break;
    case 'doctor':
        data=<DoctorDashBoard ></DoctorDashBoard>
        break;
    case 'admin':
        data=<AdminDashBoard></AdminDashBoard>
}
    return <div className={styles.bdy}>
<Navbar id={id}></Navbar>
<div>{data}</div>


    </div>
}
export default ProfilePage;