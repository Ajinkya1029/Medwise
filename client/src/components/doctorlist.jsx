import React, {useState, useEffect } from "react";

function DoctorList(){
    const [dfList,setDflist]=useState([]);
    const [dList,setDlist]=useState([]);
    const [filter,setFilter]=useState("");
    async function getData(event){

        const token=localStorage.getItem('token');
        fetch("http://localhost:1000/patient/doclist",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                Authorization:`${token}`
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                setDlist(data.List);
                console.log(data.List);
            }
        });
    }
        useEffect(()=>{
    getData();
        },[]);
        
   
    function filterData(e){
      
        e.preventDefault();
    const token=localStorage.getItem('token');
    fetch("http://localhost:1000/patient/doclist1",{ 
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json',
            Authorization:`${token}`
        },
        body:JSON.stringify({filter})
    }).then((res)=>res.json()).then((data)=>{
        if(data.success){
setDflist(data.List);
console.log(data.List);
        }
    });
    }


    return <div>
<form>
    <input onChange={(e)=>setFilter(e.target.value)}></input>
     <button onClick={filterData}></button>
    </form> 

{dfList.length>0?<div>{dfList.map((item,idx)=>(
    <div key={item._id}>
        <h2>{item.name}</h2>
    </div> 
))}</div>:<div>{dList.map((item,idx)=>(
    <div key={item._id}>
<h3>{item.name}</h3>
<h3>{item.category}</h3>
    </div>
))}</div>}

    
    </div>
}
export default DoctorList;