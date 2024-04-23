import React, { useState } from "react";
import {Link } from 'react-router-dom';
import styles from '../../css/authenticate.module.css';
function SignupHandler({value,handleChange}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  


    function submit(e) {
        // e.preventDefault();
        fetch("http://localhost:1000/patient/register", {
            method: 'POST',
            body: JSON.stringify({ name, password, email}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            if (data.success) {
                alert("User Registered")

            }
            else{
                alert(data.status);
            }
        })
    }
    return <div className={styles.register}>
<div className={styles.heading}><h3>Join Medwise</h3><Link onClick={(e)=>handleChange(true)} style={{textDecoration:'none',color:'gray'}}>Already a patient? </Link></div> 
<form className={styles.form}>
  <div className={styles.field}>  <label>Full Name</label><input onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="name" /></div>
    <div className={styles.field}>
    
    <div className={styles.field}>
    <label>Password</label></div>
    <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="password"/>
</div>
<div className={styles.field}>
    <label>Email</label>
    <input onChange={(e)=>setEmail(e.target.value)}type="text" name="email" placeholder="email"/>
</div>
<button type="submit" onClick={submit}>Submit</button>
</form>
    </div>
}
export default SignupHandler;