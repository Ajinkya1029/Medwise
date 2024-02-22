import React,{useState} from "react";
function MedicalHistory(){
    const [selectedFile,setSelectedFile]=useState(null);
    function upload(event){
        event.preventDefault();
        
            const formData=new FormData();
            formData.append('pdf',selectedFile);
        fetch('http://localhost:1000/pdf/upload',{
            method:"POST",
            body:formData,
            
        });
        
    }
    function setFile(event){
        setSelectedFile(event.target.files[0]);
    }
    return <div>
       <form>
        <input type="file" onChange={setFile}></input>
        <button type="submit" style={{backgroundColor:"black"}} onClick={upload}>Submit</button>
       </form>
        </div>
}
export default MedicalHistory;