import React,{ useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';
import AddDoctor from "./adddoctor";
import UploadMedicalHistory from "./uploadmedicalhistory";
import UploadPrescription from "./uploadprescription";
import UploadPatient from "./uploadpatient";
import PatientList from "./patientlist";
import DoctorList from "./doctorlist";

function AdminDashBoard(){
 
const navigate=useNavigate()
    const [component,setComponent]=useState(null);
   function handler(event){
if(event.target.name==="adddoctor"){
    setComponent(<AddDoctor></AddDoctor>);
}else if(event.target.name==="addmedical"){
    setComponent(<UploadMedicalHistory></UploadMedicalHistory>);
}else if(event.target.name==="updatepres"){
    setComponent(<UploadPrescription></UploadPrescription>);
}else if(event.target.name==="updateadd"){
    setComponent();
}else if(event.target.name==="patlist"){
    setComponent(<PatientList/>);
}else if(event.target.name==='doclist'){
    setComponent(<DoctorList/>)
}
else{
    setComponent(<UploadPatient></UploadPatient>);
}

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

   
   <Link name="patlist" className={styles.link} onClick={handler}>Patient List</Link>
   <Link name="doclist" className={styles.link} onClick={handler}>Doctor List</Link>
   <Link onClick={HandleLogout} className={styles.link} >Logout</Link>
   </div>
   <div className={styles.feature}>
{component}
   </div>
    </div>


}
export default AdminDashBoard;