import React,{useState} from "react";
import {Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import styles from '../css/authenticate.module.css';
function LoginHandler(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [roles,setRoles]=useState('');
  const navigate=useNavigate();
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
navigate('/');
            }else{
            alert("Wrong password");
            }
        })
    }
    return <div className={styles.register}>
    <div className={styles.heading}><h3>Join Medwise</h3><Link style={{textDecoration:'none',color:'gray'}}>New to Medwise? </Link></div> 
    <form className={styles.form}>
      <div className={styles.field}>  <label>Full Name</label><input type="text" name="name" placeholder="name" onChange={(e)=>setName(e.target.value)} /></div>
        <div className={styles.field}>
        
        <div className={styles.field}>
        <label>Password</label></div>
        <input onChange={(e)=>setPassword(e.target.value)} type="text" name="password" placeholder="password" />
    </div>
    <div className={styles.field}>
        <label>Roles</label>
        <input onChange={(e)=>setRoles(e.target.value)} type="text" />
    </div>
    <button onClick={submit} type="submit">Submit</button>
    </form>
        </div>
}
export default LoginHandler