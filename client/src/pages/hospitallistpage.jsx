import React from "react";
// import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/general/navbar";

function HospitalListPage(){
// const [hospitalList,setHospitalList]=useState([]);
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
    // setHospitalList(data.List);
    }
});

}
useEffect(()=>{
    getData();
},[]);
return <div>
<Navbar  ></Navbar>
</div>
}
export default HospitalListPage;