import React from "react";
import styles from '../../css/doctorlisting.module.css';
import pfp from '../../resources/pfp.png';

function Dcard(props){
return <div className={styles.card}>
       <div className={styles.imagediv}>
        <h3>{props.id}</h3>
       <img src={pfp}  alt="Hello"></img>
       </div>
       <div className={styles.carddetail}>

        <h1>{props.name}</h1>
        <h3>{props.email}</h3>
        <h3>{props.category}</h3>
       </div>
        
</div>
}
export default Dcard;