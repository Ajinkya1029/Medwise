const express=require('express');
const jwt=require('jsonwebtoken');
const Patient=require('../models/patient_model');
const Doctor=require('../models/doctor_model');
const Admin =require('../models/admin_model');

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

router.get('/hpat',authenticate,async(req,res)=>{
 res.send("hello");

});
router.post('/admin')
router.post('/register',authenticate,async(req,res)=>{
    const {name,password,email,category}=req.body;
    const newDoctor=new Doctor({name:name,password:password,email:email,category:category,roles:"doctor"});
    newDoctor.save().then(dc=>{
        res.status(200).json({success:true,status:"Doctor Registered"});
    }).catch(err=>{
        res.status(400).json({success:false,status:"Doctor not registered"});
    })
})
module.exports=router;

