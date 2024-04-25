import React,{useState} from "react";
import {Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import styles from '../../css/authenticate.module.css';
function LoginHandler({value,handleChange}){
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
            alert(`${data.status}`);
            }
        })
    }
    return <div className={styles.register}>
    <div className={styles.heading}><h3>Join Medwise</h3><Link onClick={(e)=>handleChange(false)} style={{textDecoration:'none',color:'gray'}}>New to Medwise? </Link></div> 
    <form className={styles.form}>
      <div className={styles.field}>  <label>Email</label><input type="email" name="name" placeholder="email" onChange={(e)=>setName(e.target.value)} /></div>
        <div className={styles.field}>
        
        <div className={styles.field}>
        <label>Password</label></div>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="password" />
    </div>
    <div className={styles.field}>
        <label>Roles</label>
        <input onChange={(e)=>setRoles(e.target.value)} type="text" placeholder="roles"/>
    </div>
    <button onClick={submit} type="submit">Submit</button>
    </form>
        </div>
}
export default LoginHandler