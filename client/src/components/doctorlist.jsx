import React, {useState, useEffect } from "react";
const url="http://localhost:1000/doclist";
function DoctorList(){
    const [dList,setDlist]=useState([]);
    function getData(url){
        const token=localStorage.getItem('token');
        fetch(url,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                Authorization:`${token}`
            }
        }).then((res)=>res.json()).then((data)=>{
            console.log(data);
        });
    }
    useEffect(()=>{
getData(url);
    },[]);
    
    return <div>

    </div>
}
export default DoctorList;