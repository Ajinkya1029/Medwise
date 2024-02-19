import React, { useEffect, useState } from "react";

import Navbar from "../components/navbar";
import data from '../data/Doctor';
import Dcard from "../components/dcard";
import styles from '../css/doctorlisting.module.css';
import {jwtDecode} from 'jwt-decode';
function DoctorListingPage(){
const [category,setCategory]=useState("");
const [id,setId]=useState("");
const [currentPage,setCurrentPage]=useState(1);

const [dat,setData]=useState([]);
function getData(){
    fetch('http://localhost:1000/general/doclist',{
        method:'GET',
        headers:{
            'Content-Type':"application/json",
            Accept:'application/json'
        }
    }).then((res)=>res.json()).then((data)=>{
setData(data.List);
console.log(data.List);
    })}
useEffect(()=>{
 const token=localStorage.getItem('token');
    if(token){
        const decoded=jwtDecode(token);

    setId(decoded.name);
    }
    getData();
},[])
useEffect(()=>{
    filterCategory();
},[category]);


function filterCategory(event){
    
fetch('http://localhost:1000/general/filterdoclist',{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Accept:'application/json'
    },
    body:JSON.stringify({category}),
}).then((res)=>res.json()).then((data)=>{
    console.log(data.List);
    setData(data.List);
    setCurrentPage(1);
})

}
let totalPages=Math.ceil(dat.length/4);
const indexOfLastItem=currentPage*4;
const indexOfFirstItem=indexOfLastItem-4;
let currentItem=dat.slice(indexOfFirstItem,indexOfLastItem);
return <div>
<Navbar id={id}></Navbar>
<div className={styles.filter}><h2>Filter according to category</h2>
<select  onChange={(e)=>{setCategory(e.target.value)}}>
<option value=""  >Select category</option>
<option value="oncologist">Oncologist</option>
<option value="dentist">Dentist</option>
<option value="physician">Physician</option>
</select>
</div>
<div className={styles.dlist}>

{currentItem.map((item,idx)=>(
   
        <Dcard key={idx}image={item.image} name={item.name} email={item.email} category={item.category}></Dcard>
       
))}
<div className={styles.pagecounter}>
<div onClick={(e)=>{if(currentPage>1)setCurrentPage(currentPage-1)}}>
    Prev
</div>
<div>
    {`${currentPage} out of ${totalPages}`}
</div>
<div onClick={(e)=>{if(currentPage<totalPages)setCurrentPage(currentPage+1)}}>
    Next
</div>
</div>

</div>
</div>
}
export default DoctorListingPage;