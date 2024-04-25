import React from "react";
import { useEffect,useState } from "react";
import Navbar from "../components/general/navbar";
import styles from '../css/aboutus.module.css';
import {jwtDecode} from 'jwt-decode';
function AboutUs(){
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
    At MedWise, we're dedicated to transforming medical data management into a seamless experience. Our platform serves as a one-stop hub where patients can effortlessly interact with any hospital in their area. By centralizing all prescriptions and associated doctors in one place, we offer unparalleled convenience for our users.

With MedWise, users have the ease of exploring more medical help if needed, as we aim to be the go-to resource for all healthcare needs. Our mission is to provide a comprehensive solution that streamlines healthcare access and empowers users to take control of their medical journey.
    </div>
</div>
}
export default AboutUs;