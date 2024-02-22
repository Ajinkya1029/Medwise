import React,{useState} from "react";
import {useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from "../components/general/navbar";
import PatientDashBoard from "../components/patient/patientdashboard";
import DoctorDashBoard from "../components/doctor/doctordashboard";

function ProfilePage(){
    let data;


 const [id,setId]=useState("");
 const [list,setList]=useState([]);
 const [roles,setRoles]=useState("");
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





 

 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
   
    setId(decoded.name);
    setRoles(decoded.roles)
  }
  getData();
 },[]);
 switch(roles){
    case 'patient': 
    data=<PatientDashBoard list={list}></PatientDashBoard>
    break;
    case 'doctor':
        data=<DoctorDashBoard list={list}></DoctorDashBoard>
}
    return <div>
<Navbar id={id}></Navbar>
<div>{data}</div>


    </div>
}
export default ProfilePage;