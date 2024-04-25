const express=require('express');
const jwt=require('jsonwebtoken');
const Patient=require('../models/patient_model');
const Doctor=require('../models/doctor_model');
const Admin =require('../models/admin_model');
const Hospital =require("../models/hospital_model");
const { stat } = require('fs/promises');

const router=express.Router();

const secretKey = "Thisissecret";

function authenticate(req,res,next){
   const token=req.headers['authorization'];
   if(!token){
       return res.status(401).json({success:'false',message:'Token not provided'});
   }
   jwt.verify(token,secretKey,(err,decoded)=>{
       if(err){
           return res.status(403).json({success:'false',message:'Failed to authenticate'});
       }
       req.user=decoded;
       next()
   });
}



router.post('/hospitalregister',authenticate,async(req,res)=>{
    const {hospital}=req.body;
    const name=req.user.name;
    console.log(hospital)
    try{
const adn=await Admin.findOne({name:name})

    const hpt=await Hospital.findOne({name:hospital});

    adn.hospital=hpt._id;
    hpt.admin=adn._id;
   
    await Promise.all([hpt.save(),adn.save()]);
    return res.status(200).json({success:true,status:"Saved"})

    
}catch(err){
    res.status(400).json({success:false,status:err})

}

})
router.get('/hpat',authenticate,async(req,res)=>{
 res.send("hello");

});

router.post('/register',authenticate,async(req,res)=>{
    // According to admin hospital add the doctor hospital 
    const hospital=req.user.hospital;
    const {name,password,category,email}=req.body;
  
    
    const newDoctor=new Doctor({name:name,password:password,category:category,roles:"doctor",email:email});
    newDoctor.hospital.push(hospital);
    newDoctor.save().then(dc=>{
        res.status(200).json({success:true,status:"Doctor Registered"});
    }).catch(err=>{
        res.status(400).json({success:false,status:"Doctor not registered"});
    })
})
router.delete('/patient/:pId',authenticate,async(req,res)=>{
    const userId=req.params.pId;
    const hospital=req.user.hospital;
    
    await Patient.deleteOne({name:userId}).then(pt=>{
        
        res.status(200).json({success:true,status:"Patient Deleted"})
    }).catch(err=>{
        res.status(400).json({success:false,status:"Patient not Deleted"})
    })
})
router.delete('/doctor/:dId',authenticate,async(req,res)=>{
    const userId=req.params.dId;
    const hospital=req.user.hospital;
    await Doctor.deleteOne({name:userId}).then(pt=>{
        res.status(200).json({success:true,status:"Doctor Deleted"})
    }).catch(err=>{
        res.status(400).json({success:false,status:"Doctor not Deleted"})
    })
})
router.get('/patientlist',authenticate,async(req,res)=>{
    const hospital=req.user.hospital;
    
    await Patient.find({hospital:{$elemMatch:{$eq:hospital}}}).populate('doctor').then(pt=>{
        console.log(pt);
        if(!pt){
            res.status(200).json({success:true,status:"No Patient Found"});
        }else{
            res.status(200).json({success:true,status:"OK","list":pt});
        }
    }).catch(err=>{
        res.status(400).json({success:false,status:err});
    })
})
router.get('/doctorlist',authenticate,async(req,res)=>{
    const hospital=req.user.hospital;
    
    await Doctor.find({hospital:{$elemMatch:{$eq:hospital}}}).then(pt=>{
        console.log(pt);
        if(!pt){
            res.status(200).json({success:true,status:"No Patient Found"});
        }else{
            res.status(200).json({success:true,status:"OK","list":pt});
        }
    }).catch(err=>{
        res.status(400).json({success:false,status:err});
    })
})
module.exports=router;

