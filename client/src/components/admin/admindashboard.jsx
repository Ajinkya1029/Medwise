import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';

function AdminDashBoard(){
   
    return  <div className={styles.tab}>
    <Link name="vdoctor">View Doctors</Link>
    <Link name="appoint" >View Appointments</Link>
    <Link name="medhistory" >View Medical History</Link>
    <Link  >Logout</Link>
</div>


}
export default AdminDashBoard;