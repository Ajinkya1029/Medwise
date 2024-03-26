import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';
import AssociatedPatient from "../doctor/associatedpatient";
import DoctorListingPage from "../../pages/doctorlistpage";
import AddDoctor from "./adddoctor";

function AdminDashBoard(){
const navigate=useNavigate()
    const [component,setComponent]=useState(null);
   function handler(event){
if(event.target.name==="adddoctor"){
    setComponent(<AddDoctor></AddDoctor>);
}else if(event.target.name==="addmedical"){
    setComponent();
}else if(event.target.name==="updatepres"){
    setComponent();
}else if(event.target.name==="updateadd"){
    setComponent();
}else{
    setComponent();
}
console.log(event.target.name)
   }
   function HandleLogout(){
    localStorage.removeItem('token');
    navigate('/login');
     }
    return <div className={styles.admindashboard}>
   <div className={styles.utility}>
   <Link name="adddoctor"className={styles.link} onClick={handler}> Add Doctor </Link>
    <Link name="addmedical" className={styles.link} onClick={handler}>Add Medical record</Link>
    <Link name="updatepres" className={styles.link}onClick={handler}>Update Prescription</Link>
   <Link name="updateapp" className={styles.link} onClick={handler}>Update Appointment</Link>
   <Link name="updatepat" className={styles.link} onClick={handler}>Update Patient</Link>
   <Link onClick={HandleLogout} className={styles.link} >Logout</Link>
   </div>
   <div className={styles.feature}>
{component}
   </div>
    </div>


}
export default AdminDashBoard;