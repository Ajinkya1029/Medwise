import React, { useState } from "react";
import styles from '../../css/admincomponent.module.css';
function UploadPatient(){
    const [name,setName]=useState("");
    function submit(e){
        const token=localStorage.getItem("token");
e.preventDefault();

fetch(`http://localhost:1000/admin/patient/${name}`,{
    method:"DELETE",
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
        'Authorization':`${token}`
    }
    
}).then(res=>res.json()).then((data)=>{
    if(data.success){
        alert("Patient Deleted")
    }else{
        alert("Failed")
    }
})
    }
return <div>

    <form style={styles.updateform}>
        <input name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)}></input>
        <button type="submit" onClick={submit}>Submit</button>
    </form>
</div>
}
export default UploadPatient;