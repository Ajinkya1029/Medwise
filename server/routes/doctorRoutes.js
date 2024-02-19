const express= require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();
const Doctor=require('../models/doctor_model');
const Patient=require('../models/patient_model');

const secretKey="Thisissecret";


function authenticate(req,res,next){
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).json({success:false,message:'Token not provided'});
    }
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            return res.status(403).json({success:false,message:'Failed to authenticate'});
            
        }
        req.user=decoded;
        next()
    });
}

router.post('/addpatients',authenticate,async(req,res)=>{
    const doc=req.user._id;
    const {name}=req.body;
   try{
    const doctor=await Doctor.findOne({_id:doc});
    if(!doctor){
        return res.status(400).json({status:'Bad Request',success:false});
    }
    const patient=await Patient.findOne({name:name});
    if(!patient){
        return res.status(400).json({status:'Register the patient first',success:false});
    }
    const isPatientAlreadyAdded = doctor.patient.some(pat => pat.equals(patient._id));
    if (isPatientAlreadyAdded) {
        return res.status(400).json({ success: false, message: 'Patient already added' });
    }
  doctor.patient.push(patient);
  patient.doctor.push(doctor);
  await Promise.all([doctor.save(),patient.save()]);
  return res.status(200).json({success:true,status:'Ok'}); 
}catch(err){
res.status(500).json({status:"Bad Request",success:false});
}
});

router.get('/patlist',authenticate,async(req,res)=>{
    const doc=req.user._id;
 try{
    const list=await Doctor.findOne({_id:doc}).populate('patient');
    
    res.status(200).json({success:true,"pat":list.patient});
 }catch(err){
    res.status(400).json({success:false,status:err});
 }
});

module.exports=router;