import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import styles from '../../css/homepage.module.css';
import medwise from '../../resources/logo-color.png';
function Navbar(props){
    const [data,setData]=useState('');
    const navigate=useNavigate();
    function keyPress(e){
   
        if(e.key==='Enter'){
            if(data){

                navigate(`/hospitallist/${data.toLowerCase()}`);
            }
        }
    }
   function search(e){
e.preventDefault();
if(data){

    navigate(`/hospitallist/${data}`);
}
   }
    return <div className={styles.navbar} onKeyDown={keyPress} >


<Link className={styles.link} to="/"><img src={medwise} className={styles.logo} alt="Hello" ></img></Link>
<ul className={styles.leftNavbar}>
<Link to="/doctorlist" className={styles.link}>Find Doctor</Link>
<Link to='/hospitallist/id:' className={styles.link}>Find Hospital</Link>
<li></li>
</ul>
<div className={styles.searchBar}>
<input type="text" onChange={(e)=>{setData(e.target.value)}} placeholder="Hospitals in your city"></input>
<button onClick={search} >Search</button>
</div>
<ul className={styles.rightNavbar}>
    <Link className={styles.link}>Support</Link>
    <Link className={styles.link}>About us</Link>
 <Link className={styles.link} to={props.id?'/profile':"/login"}>{props.id?`Welcome ${props.id}`:"Login"}</Link>
</ul>
    </div>
}
export default Navbar;