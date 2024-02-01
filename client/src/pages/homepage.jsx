import React from "react";
import SignupHandler from "../components/signup";
import LoginHandler from "../components/login";
import PatientList from "../components/patientlist";
import DoctorList from "../components/doctorlist";

function HomePage(){
    return <div>
         <SignupHandler/>
<LoginHandler/> 
{/* <DoctorList/> */}
<PatientList/>
    </div>
}
export default HomePage;