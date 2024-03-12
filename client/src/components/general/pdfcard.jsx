import React from "react";
import styles from '../../css/profile.module.css';
function PdfCard(props){
    function displayPdf(){
        window.open(`http://localhost:1000/upload/${props.name}`,"_blank");
    }
    return <div onClick={displayPdf} className={styles.pdfcard} >
        <div style={{display:"flex",gap:"20%"}}>
        <p>Pdf</p>
        <p >{props.name}</p>
        </div>
      <p>Click to open</p>
        </div>
}
export default PdfCard;