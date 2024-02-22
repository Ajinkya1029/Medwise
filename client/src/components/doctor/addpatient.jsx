import React, { useState } from "react";
const url="http://localhost:1000/addpatients";
function AddPatient(){
    const [name,setName]=useState('');
    function submit(e){
        const token=localStorage.getItem('token');
        e.preventDefault();
        fetch(url,{
            method:'POST',
            body:JSON.stringify({name}),
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                Authorization:`${token}`
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                console.log("patient added");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    return <div>
     <form>
        <input type="text" placeholder="name" name="name" onChange={(e)=>setName(e.target.value)}></input>
        <button type="submit" onClick={submit}> </button>
     </form>
    </div>
}
export default AddPatient;