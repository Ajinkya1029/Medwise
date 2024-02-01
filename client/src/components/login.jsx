import React,{useState} from "react";
function LoginHandler(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [roles,setRoles]=useState('');

    const setField=(event)=>{
        if(event.target.name==="name"){
            setName(event.target.value);
            
        }else if(event.target.name==="password"){
            setPassword(event.target.value);
        }else{
            setRoles(event.target.value);
        }
        
    }
    function submit(e){
        e.preventDefault();
        fetch('http://localhost:1000/login',{
            method:'POST',
            body:JSON.stringify({name,password,roles}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                const token=data.token;
                localStorage.setItem('token',token);
                console.log("Authorized and token saved"); 
            }else{
            alert("Wrong password");
            }
        })
    }
    return <div>
        <form >
        <input name="name"type="text"placeholder="Name" onChange={setField}></input>
        <input name="password"type="text"placeholder="Password" onChange={setField}></input>
        <input name="roles"type="text"placeholder="Roles"onChange={setField}></input>
        <button onClick={submit}></button>
     </form>
    </div>
}
export default LoginHandler