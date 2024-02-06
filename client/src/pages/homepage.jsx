import React from "react";
import SignupHandler from "../components/signup";
import LoginHandler from "../components/login";
import PatientList from "../components/patientlist";
import DoctorList from "../components/doctorlist";
import AddPatient from "../components/addpatient";

function HomePage(){
    return <div>
         <SignupHandler/>
<LoginHandler/> 
<DoctorList/>
{/* <AddPatient/> */}
{/* <PatientList/> */}
    </div>
}
export default HomePage;