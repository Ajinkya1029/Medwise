import React,{useEffect, useState} from "react";
import Navbar from "../components/general/navbar";
import {jwtDecode} from 'jwt-decode';
import styles from '../css/homepage.module.css';
function HomePage(){
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

    return <div className={styles.bdy}>
     <Navbar id={id}></Navbar>
   
    </div>
}
export default HomePage;