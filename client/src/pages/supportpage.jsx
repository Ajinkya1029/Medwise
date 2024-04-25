import React from "react";
import Navbar from "../components/general/navbar";
import styles from '../css/aboutus.module.css';
import {jwtDecode} from 'jwt-decode';
import { useEffect,useState } from "react"
function Support(){
    const [id,setId]=useState("");
    const [list,setList]=useState([]);
    const [roles,setRoles]=useState("");
    const [uuid,setUuid]=useState("");
    useEffect(()=>{
     const token=localStorage.getItem('token');
     if(token){
       const decoded=jwtDecode(token);
   
       setId(decoded.name);
       setRoles(decoded.roles)
       setUuid(decoded._id);
       
      
     }
    
    },[]);
    return <div className={styles.bdy}> 
    <Navbar id={id}/>
    <div className={styles.aboutus}>
    Your contribution helps us enhance and maintain MedWise, ensuring it remains a reliable resource for seamless medical data management. Whether you're a user, healthcare provider, or advocate for improved healthcare access, your support is invaluable.

If you have any questions, concerns, or suggestions, please don't hesitate to reach out to us at medwiseindia@gmail.com. 

We appreciate your support in making healthcare management more efficient and accessible for everyone.
    </div>
</div>
}
export default Support;