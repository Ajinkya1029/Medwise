const express =require ('express');
const multer =require('multer');
const jwt=require('jsonwebtoken');
const router=express.Router();

const secretKey="Thisissecret";

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"public");
    },
    filename:function(req,res,cb){
        const parts=file.mimetype.split('/');
        const upload=multer.Instance
    }
})
const upload=multer({storage});

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
