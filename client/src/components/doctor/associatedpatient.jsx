import React,{useState} from "react";
import Dcard from "../general/dcard";
import styles from '../../css/profile.module.css';

function AssociatedPatient(props){
   const docList=props.list;
   return <div className={styles.associatedoctor}>
{docList.map((item,idx)=>(
    <Dcard key={idx} name={item.name} email={item.email} category={item.category}></Dcard>
))}
    </div>
}
export default AssociatedPatient;