import React from "react";
import pfp from '../../resources/pfp.png';
import styles from '../../css/doctorlisting.module.css';
function HCard(props){
    return <div className={styles.card}>
    <div className={styles.imagediv}>
     <h3>{props.key}</h3>
    <img src={pfp}  alt="Hello"></img>
    </div>
    <div className={styles.carddetail}>

     <h1>{props.name}</h1>
     <h3>{props.email}</h3>
    <h3>{props.address}</h3>
    <h3>{props.city}</h3>
    <h3>{props.mobile}</h3>
    </div>
     
</div>
}
export default HCard;