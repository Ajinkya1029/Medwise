import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import AddPatient from "./addpatient";
import styles from '../../css/profile.module.css';
import AssociatedPatient from "./associatedpatient";
import UpdateDoctor from "./updatedocdata";

function DoctorDashBoard(props){
    
    const [list,setList]=useState([]);
    const [component,setComponent]=useState(null);
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    function getData(){
        const token=localStorage.getItem('token');
        fetch('http://localhost:1000/doctor/patlist',{
            method:"GET",
            headers:{
                Authorization:`${token}`,
                'Content-Type':"application/json",
                Accept:"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            if(data.success){
                setData(data.self)
                setList(data.List);
              
            }
        });
    }
    function HandleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
         }
         function render(e){
            if(e.target.name==="vpatient"){
                setComponent(<AssociatedPatient list={list}></AssociatedPatient>)
            }else if(e.target.name==="appoint"){
                setComponent(<UpdateDoctor list={data}/>);
            }else if(e.target.name==="addpatient"){
                setComponent(<AddPatient></AddPatient>);
            }
         }
         useEffect(()=>{
            getData();
         },[]);
    return <>
    <div className={styles.tab}>
<Link name="vpatient" onClick={render}className={styles.link}>View Patient</Link>
<Link name="appoint"  onClick={render}className={styles.link}>Update And View</Link>
<Link name="addpatient" onClick={(e)=>{render(e);getData()}} className={styles.link}>Add Patients</Link>
<Link className={styles.link} onClick={HandleLogout}>Logout</Link>
    </div>
   <div>{component}</div> 
   <div className={styles.uniqueid}>{props.uuid}</div>
   </>
}
export default DoctorDashBoard;