import React,{useEffect, useState} from "react";
import styles from '../../css/profile.module.css';
import PdfCard from "../general/pdfcard";
function MedicalHistory(){
    const [selectedFile,setSelectedFile]=useState(null);
    const [pdfData,setPdfData]=useState([]);
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
    function getPdf(){
        const token=localStorage.getItem('token');
        fetch("http://localhost:1000/pdf/pdfget",{
            method:"GET",
            headers:{
                Authorization:`${token}`
            }
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                setPdfData(data.List);
               
                
            }
        })
    }

    useEffect(()=>{
        getPdf();
    },[]);
    const data=pdfData;
    return <div className={styles.medicalhistory}>
       <div style={{textAlign:"center"}} onClick={(e)=>{}}><h1>View Pdf</h1></div>
       {pdfData!=null? <div className={styles.grid}>
       {pdfData.map((item,idx)=>(
    <PdfCard key={idx} name={item.name}></PdfCard>
))}
       </div>:<div>No Data</div>}
      
       
        </div>
}
export default MedicalHistory;
{/* <form className={styles.uploadform}>
        <h1>Upload data</h1>
        <input type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}}></input>
        <button type="submit" style={{backgroundColor:"black"}} onClick={upload}>Submit</button>
       </form> */}