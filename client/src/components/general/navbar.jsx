import React,{useState} from "react";
import {Link} from 'react-router-dom';
import styles from '../../css/homepage.module.css';
import medwise from '../../resources/logo-color.png';
function Navbar(props){
    const [data,setData]=useState('');
    function getData(event){
        event.preventDefault();
        fetch("http://localhost:1000/general/filterdoclist",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
                Accept:'application/json'
            },
            body:JSON.stringify({data}),
        }).then((res)=>res.json()).then((data)=>{
            if(data.success){
                console.log(data.List);
             
            }
        })
    }
    return <div className={styles.navbar}>

<Link className={styles.link} to="/"><img src={medwise} className={styles.logo} alt="Hello" ></img></Link>
<ul className={styles.leftNavbar}>
<Link to="/doctorlist" className={styles.link}>Find Doctors</Link>
<Link to='/hospitallist' className={styles.link}>Find Hospital</Link>
<li></li>
</ul>
<div className={styles.searchBar}>
<input type="text" onChange={(e)=>{setData(e.target.value)}} placeholder="Hospitals in your city"></input>
<button onClick={getData} >Search</button>
</div>
<ul className={styles.rightNavbar}>
    <Link className={styles.link}>Support</Link>
    <Link className={styles.link}>About us</Link>
 <Link className={styles.link} to={props.id?'/profile':"/login"}>{props.id?`Welcome ${props.id}`:"Login"}</Link>
</ul>
    </div>
}
export default Navbar;