const express =require ('express');
const multer =require('multer');
const Pdf=require('../models/pdf_model');
const jwt=require('jsonwebtoken');
const fs=require('fs');
const router=express.Router();

const secretKey="Thisissecret";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload/");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
// const storage=multer.memoryStorage();
const upload=multer({storage:storage});

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
router.post('/upload',upload.single('pdf'),async(req,res)=>{
    try{
       const{originalname,buffer}=req.file;
        const pdf=new Pdf({
            name:originalname,
            data:buffer
        });
        await pdf.save();
        res.status(200).json({success:true,status:"Pdf Saved"});
    }catch(err){
res.status(400).json({success:false,status:`${err}`});
    }
})
module.exports=router;