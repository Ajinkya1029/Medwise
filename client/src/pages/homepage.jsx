import React,{useEffect, useState} from "react";
import Navbar from "../components/general/navbar";
import {jwtDecode} from 'jwt-decode';

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

    return <div>
     <Navbar id={id}></Navbar>
     <div>{role}</div>
    </div>
}
export default HomePage;