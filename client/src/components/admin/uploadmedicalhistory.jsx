import React from "react";
import styles from '../../css/admincomponent.module.css';
import { useState } from "react";
function UploadMedicalHistory(){
    function upload(event){
        event.preventDefault();
        const token=localStorage.getItem('token');
            const formData=new FormData();
            formData.append('pdf',selectedFile);
            
        fetch('http://localhost:1000/pdf/upload',{
            method:"POST",
            body:formData,
            headers:{
                Authorization:`${token}`
            }
            
        }).then((res)=>res.json()).then(data=>{
            if(data.success){
                console.log(data.status);
            }
        }).catch(err=>{
            console.log(err);
        });
        
    }
    const [name,setName]=useState("");
    const [selectedFile,setSelectedFile]=useState(null);
    return <div>
        <form className={styles.uploadform}>
        <h1>Upload data</h1>
        <input type="text" placeholder="Patient name" onChange={(e)=>setName(e.target.value)}></input>
        <input type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}}></input>
        <button type="submit" style={{backgroundColor:"black"}} onClick={upload}>Submit</button>
       </form>
    </div>
}
export default UploadMedicalHistory;