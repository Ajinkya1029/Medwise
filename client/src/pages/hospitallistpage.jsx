import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/general/navbar";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router";
import HCard from "../components/general/hcard";
import styles from '../css/hospitallistingpage.module.css';
function HospitalListPage(){
    const [name,setName]=useState("");
    const[search,setSearch]=useState("");
    let {id}=useParams();
    
const [hospitalList,setHospitalList]=useState([]);

function getSearchData(event){
id=id.toLowerCase()
    fetch("http://localhost:1000/general/hoscity",{
        method:"POST",
        headers:{
            'Content-type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify({id}),
    }).then((res)=>res.json()).then((data)=>{
        if(data.success){
            console.log(data.List);
setHospitalList(data.List);
         
        }
    })
}
function getData(event){
    fetch("http://localhost:1000/general/hlist",{
        method:"GET",
        headers:{
            'Content-type':"application/json",
            Accept:'application/json'
        }
    }).then((res)=>res.json()).then((data)=>{
        if(data.success){
            console.log(data.List);
        setHospitalList(data.List);
        }
    });
    
    }

useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
        const decoded=jwtDecode(token);
setName(decoded.name);
    }
    if(id!="id:"){
        
        getSearchData();
    }else{
      getData();
    }
    
},[id]);
function searchByName(e){
e.preventDefault();
    fetch('',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Accept:"application/json",
        },
        body:JSON.stringify({search})
    }).then(res=>res.json()).then(data=>{
        if(data.success){
            setHospitalList(data.List);
        }
    })
}
return <div className={styles.bdy}>
<Navbar id={name} ></Navbar>
<div className={styles.hospitallist}>
    <div className={styles.search}>
<h2>Search hospital by name</h2>
<form ><input onChange={(e)=>setSearch(e.target.value)}></input><button onClick={searchByName}>Submit</button></form>
        </div>
<div className={styles.hlist}>
{hospitalList!=null?<div>{hospitalList.map((item,idx)=>(
    <HCard key={idx} name={item.name} address={item.address} mobile={item.mobile} city={item.city}></HCard>
    ))}</div>:<div>No data</div>}
</div>
    </div>
</div>
}
export default HospitalListPage;


















