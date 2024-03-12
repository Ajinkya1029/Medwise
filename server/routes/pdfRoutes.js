const express =require ('express');
const multer =require('multer');
const Pdf=require('../models/pdf_model');
const jwt=require('jsonwebtoken');
const Patient=require('../models/patient_model');
const fs=require('fs');
const router=express.Router();

const secretKey="Thisissecret";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./upload");
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
router.post('/upload',authenticate,upload.single('pdf'),async(req,res)=>{
    const name=req.user.name;
    
    await Patient.findOne({name:name}).then(pt=>{
        const{originalname,buffer}=req.file;
        console.log(req.file);
        const pdf=new Pdf({
            name:originalname,
            data:buffer
        });
        pt.pdf.push(pdf);
        Promise.all([pdf.save(),pt.save()]);
         res.status(200).json({success:true,status:"Pdf Saved"});
    }).catch(err=>{
        res.status(400).json({success:false,status:"Failed to save"});
    });
    });

    router.get('/pdfget',authenticate,async(req,res)=>{
    
        const name=req.user.name;
    try{
        await Patient.findOne({name:name}).populate('pdf').then(pd=>{
            res.status(200).json({success:true,"List":pd.pdf});
        })
    }catch(err){
        res.status(400).json({success:false});
    }
    });
module.exports=router;