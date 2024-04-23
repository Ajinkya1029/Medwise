import React, { useState } from "react";
import styles from '../../css/profile.module.css';
const url="http://localhost:1000/doctor/addpatients";
function AddPatient(){
    const [name,setName]=useState("");
    function submit(e){
        if(name!=null){
            alert("Empty Field");
        }else{

            const token=localStorage.getItem('token');
            e.preventDefault();
            fetch(url,{
            method:'POST',
            body:JSON.stringify({name}),
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                Authorization:`${token}`
            }   
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                alert(data.status);
            }else{
                alert(data.status);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    }
    return <div>
     {/* <form>
        <input type="text" placeholder="name" name="name" onChange={(e)=>setName(e.target.value)}></input>
        <button type="submit" onClick={submit}> submit</button>
     </form> */}
     <form  className={styles.addpatient}>

     <h1>Register the patient</h1>
     <input name="name" placeholder="Email" onChange={(e)=>setName(e.target.value)}></input>
     {/* <input type="text" placeholder="Case"></input> */}
     <button onClick={submit}>Submit</button>
     </form>
    </div>
}
export default AddPatient;