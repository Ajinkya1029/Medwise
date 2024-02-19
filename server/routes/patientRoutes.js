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

router.get('/doclist',authenticate,async (req,res)=>{
    
await Doctor.find().then(dc={
    if(dc){
        res.status(200).json({success:true,"List":dc});
    }
}).catch(err=>{
    res.status(400).json({success:false});
});

   
       
});
router.post('/doclist1',authenticate,async(req,res)=>{
    const {filter}=req.body;
try{
    await Doctor.find({category:filter}).then(dList=>{
        if(!dList){
            res.status(404).json({success:false,status:"Bad Request"});
        }
        const filterList=dList.map(item=>item.toJSON());
        res.status(200).json({success:true,"List":filterList});
    }).catch(err=>{
        res.status(400).json({success:false,status:"Bad Request"});
    });

    
}catch(err){
    
    res.status(400).json({success:false,status:err});
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