import React,{useEffect, useState} from "react";
import styles from '../../css/profile.module.css';
import PdfCard from "../general/pdfcard";
function MedicalHistory(){
    const [selectedFile,setSelectedFile]=useState(null);
    const [pdfData,setPdfData]=useState([]);
   
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
