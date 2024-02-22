const express =require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();

const Patient=require('../models/patient_model');
const Doctor=require('../models/doctor_model');

const secretKey="Thisissecret";

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

router.get('/patientsdoctor',authenticate,async (req,res)=>{
    const name=req.user.name;
   try{
    const list=await Patient.findOne({name:name}).populate('doctor');
    res.status(200).json({success:true,"List":list.doctor});
   }catch(err){
    res.status(400).json({success:true});
   }
});
   
       



router.post('/register', async (req, res) => {
    const {name,password,email}=req.body;
       const newPatient = new Patient({ name: name, password: password, roles: "patient",email:email});
        await newPatient.save().then(pat => {
            res.status(200).send({ status: 'ok', success: true });

        });
    
});

module.exports=router;