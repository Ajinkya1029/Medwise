import React,{useState} from "react";
import { useEffect } from "react";
import Navbar from "../components/general/navbar";
import styles from '../css/authenticate.module.css';
import LoginHandler from "../components/general/login";
import SignupHandler from "../components/general/signup";
import {jwtDecode} from 'jwt-decode';
 function Authenticate(){
   
   const [id,setId]=useState("");
 
 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded=jwtDecode(token);
   
    setId(decoded.name);
  }
 },[]);
    const [selector,setSelector]=useState(true);
    return <div> 
        <Navbar id={id}></Navbar>
        
   <div className={styles.select}>
    <h2 className={selector?`${styles.selected}`:`${styles.notselected}`} onClick={(e)=>{setSelector(true)}}>Login</h2>
    <h2 className={selector?`${styles.notselected}`:`${styles.selected}` } onClick={(e)=>{setSelector(false)}}>Register</h2> 
    </div>
   {selector?<LoginHandler value={selector} handleChange={setSelector}></LoginHandler>:<SignupHandler value={selector} handleChange={setSelector} ></SignupHandler>}
    </div>
 }
 export default Authenticate;