import React, { useState,useEffect } from "react";
import pfp from '../../resources/pfp.png';
import styles from '../../css/patientcomponent.module.css';
import { useNavigate } from "react-router";
function UpdateDoctor(props){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
   
    const [mobile,setMobile]=useState("");
   
    useEffect(()=>{

setName(props.list.name)

setEmail(props.list.email)
setMobile(props.list.mobile)
    },[]);
    function submit(e){
        const token=localStorage.getItem("token");
        e.preventDefault();
      
        console.log(name)
        if(name===props.list.name&&email===props.list.email&&mobile===props.list.mobile){
alert("No Changes Made");
        }else{

            fetch("http://localhost:1000/doctor/update",{
                method:"PUT",
                headers:{
                    'Content-Type':"application/json",
                    'Accept':"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({name,email,mobile})
            }).then(res=>res.json()).then(data=>{
                if(data.success){
                    alert("Data Updated");
                    localStorage.removeItem('token');
                    navigate('/login');              
                }else{
                    alert("Falied");
                }
            })
        }
    }
return <div>
<div className={styles.card}>
       <div className={styles.imagediv}>
        {/* <h3>{props.list.id}</h3> */}
       <img src={pfp}  alt="Hello"></img>
       </div>
       <div className={styles.carddetail}>
       <div className={styles.labels}>
                   <h3>Name:</h3>
                    <h3>Email:</h3>
                    <h3>Mobile:</h3>
                   
                    </div>

<div className={styles.inputs}>
    
<input placeholder={name} onChange={(e)=>{setName(e.target.value)}}></input>
                <input placeholder={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                 <input placeholder={mobile} onChange={(e)=>{setMobile(e.target.value)}}></input>
               
       <button onClick={submit}>Save Changes</button>
</div>
       </div>
</div>
</div>

}
export default UpdateDoctor;

