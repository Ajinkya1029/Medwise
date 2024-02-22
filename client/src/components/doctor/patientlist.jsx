import React, { useEffect, useState } from "react";
const url="http://localhost:1000/doctor/patlist";
function PatientList(){
    const [pList,setPList]=useState([]);
 async   function  getData(url){
        const token=localStorage.getItem('token');
      
        await fetch(url,{
            method:"GET",
            headers:{
                'Content-Type':'application/type',
                Accept:'application/type',
                Authorization:`${token}`
            }

        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                console.log(data.pat);
                setPList(data.pat);

            }
         });
}
useEffect(()=>{
    getData(url)
},[]);
    return <div>
{pList.map((item,idx)=>(
    <div key={item._id}>
        <h4>{item.name}</h4>
        <h4>{item.password}</h4>
        </div>
))}
    </div>
}
export default PatientList;