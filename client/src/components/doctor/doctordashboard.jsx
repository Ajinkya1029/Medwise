import React from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import styles from '../../css/profile.module.css';

function DoctorDashBoard(props){
    const navigate=useNavigate();
    function HandleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
         }
    return <div className={styles.tab}>
<Link className={styles.link}>View Patient</Link>
<Link className={styles.link}>View Appointments</Link>
<Link className={styles.link}>Add Patients</Link>
<Link className={styles.link} onClick={HandleLogout}>Logout</Link>
    
    </div>
}
export default DoctorDashBoard;