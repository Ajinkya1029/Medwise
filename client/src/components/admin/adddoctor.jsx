import React from "react";
function AddDoctor(){
   function submit(){
    const token=localStorage.getItem("token");
    fetch("http://localhost:1000/admin/register",{
        method:"POST",
        body:JSON.stringify({}),
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`${token}`
        }
        
    }).then(res=>res.json()).then((data)=>{
        if(data.success){
            console.log("Doctor added")
        }else {
            console.log("Failed")
        }
    })
   }
   return <div> 
Add Doctor
    </div>
}
export default AddDoctor;