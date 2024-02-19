import React from "react";
import {Link} from 'react-router-dom';
import styles from '../css/homepage.module.css';
import medwise from '../resources/logo-color.png';
function Navbar(props){
    return <div className={styles.navbar}>

<Link className={styles.link} to="/"><img src={medwise} className={styles.logo} ></img></Link>
<ul className={styles.leftNavbar}>
<Link to="/doctorlist" className={styles.link}>Find Doctors</Link>
<Link className={styles.link}>Find Hospital</Link>
<li></li>
</ul>
<div className={styles.searchBar}>
<input type="text" placeholder="Hospitals in your city"></input>
<button >Search</button>
</div>
<ul className={styles.rightNavbar}>
    <Link className={styles.link}>Support</Link>
    <Link className={styles.link}>About us</Link>
 <Link className={styles.link} to={props.id?'/profile':"/login"}>{props.id?`Welcome ${props.id}`:"Login"}</Link>
</ul>
    </div>
}
export default Navbar;