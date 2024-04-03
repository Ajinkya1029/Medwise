import React, { useState } from "react";
import styles from '../../css/admincomponent.module.css';

function AddDoctor(){
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [category,setCategory]=useState("");
   function submit(e){
    e.preventDefault();
    const token=localStorage.getItem("token");
    fetch("http://localhost:1000/admin/register",{
        method:"POST",
        body:JSON.stringify({name,password,category}),
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`${token}`
        }
        
    }).then(res=>res.json()).then((data)=>{
        if(data.success){
            console.log("Doctor added")
        }else {
            console.log("Failed")
        }
    })
   }
   return <div className={styles.adddoctor}> 
<h1>Register Doctor</h1>
<form className={styles.adddoctorform}>

    <input name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)}></input>
    <input name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
    <input name="category" placeholder="Category" onChange={(e)=>setCategory(e.target.value)}></input>
    <button type="submit" onClick={submit}>Submit</button>
</form>

    </div>
}
export default AddDoctor;