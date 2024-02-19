const express=require('express');
const Doctor=require('../models/doctor_model');
const Hospital=require('../models/hospital_model');
const router=express.Router();

// doctor list
// hospital list
// filter doctor list
// filter hospital list
router.get('/doclist',async (req,res)=>{
await Doctor.find().then(dc=>{
    res.status(200).json({success:true,"List":dc,status:"Ok"});
}).catch(err=>{
    res.status(400).json({success:false,status:'Bad Request'});
})
});
router.post('/filterdoclist',async(req,res)=>{
    const {category}=req.body;
    if(category){
        await Doctor.find({category:category}).then(dc=>{
            res.status(200).json({success:true,status:'Ok',"List":dc});
        }).catch(err=>{
            res.status(400).json({success:false,status:"Bad Request"});
        });
    }else{
        await Doctor.find().then(dc=>{
            res.status(200).json({success:true,"List":dc,status:"Ok"});
        }).catch(err=>{
            res.status(400).json({success:false,status:'Bad Request'});
        })
    }
})







module.exports=router;