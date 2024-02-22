import React,{useState} from "react";
import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from "../components/general/navbar";
import styles from '../css/profile.module.css';
import AssociateDoctor from "../components/patient/associatedoctor";

function ProfilePage(){
    const navigate=useNavigate();

 const [id,setId]=useState("");
 const [list,setList]=useState([]);
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
setList(data.List);
console.log(data.List);
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

 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
   
    setId(decoded.name);
  }
  getData();
 },[]);
 
    return <div>
<Navbar id={id}></Navbar>
<div className={styles.tab}>
    <Link className={styles.link}>View Doctors</Link>
    <Link className={styles.link}>View Appointments</Link>
    <Link className={styles.link}>View Medical History</Link>
    <Link onClick={HandleLogout} className={styles.link} >Logout</Link>
</div>
<div>
    <AssociateDoctor list={list}/>
</div>
    </div>
}
export default ProfilePage;