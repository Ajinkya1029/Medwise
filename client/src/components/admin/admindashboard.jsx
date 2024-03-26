import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';

function AdminDashBoard(){
   
    return <div className={styles.admindashboard}>
    <h5>Add Doctor</h5>
    <h5>Add Medical record</h5>
    <h5>Update Prescription</h5>
   <h5>Update Appointment</h5>
   <h5>Update Patient</h5>
   
    </div>


}
export default AdminDashBoard;