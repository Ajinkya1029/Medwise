import React,{useState} from "react";
import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from "../components/navbar";
import styles from '../css/profile.module.css';

function ProfilePage(){
    const navigate=useNavigate();
    const [role,setRole]=useState("");
 const [id,setId]=useState("");
 
 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
    setRole(decoded.roles);
    setId(decoded.name);
  }
 },[]);
 function HandleLogout(){
localStorage.removeItem('token');
navigate('/login');
 }
    return <div>
<Navbar id={id}></Navbar>
<div className={styles.tab}>
    <Link className={styles.link}>View Doctors</Link>
    <Link className={styles.link}>View Appointments</Link>
    <Link className={styles.link}>View Medical History</Link>
    <Link onClick={HandleLogout} className={styles.link} >Logout</Link>
</div>
    </div>
}
export default ProfilePage;