import React,{useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';
import AssociateDoctor from "./associatedoctor";
import LoginHandler from '../general/login';
function PatientDashBoard(props){
    const [component,setComponent]=useState(null);
    const navigate=useNavigate();
    function HandleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
         }
         function render(e){
            console.log(e.target.name);
if(e.target.name==="vdoctor"){
setComponent(<AssociateDoctor list={props.list}></AssociateDoctor>)
}else if(e.target.name==="appoint"){

}
console.log(component);
         }
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