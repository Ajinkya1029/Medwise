const express=require('express');
const mongoose=require('mongoose');
const Doctor=require('../server/models/doctor_model');
const Patient=require('../server/models/patient_model');
const Pdf=require('./models/pdf_model')
const jwt=require('jsonwebtoken');
const cors=require('cors');
const bodyParser=require('body-parser');
const port=1000;

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const secretKey="Thisissecret";

mongoose.connect('mongodb://127.0.0.1:27017/medwise');

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

app.get('/',(req,res)=>{
    res.send("hello");
 });

app.post('/register',async (req,res)=>{
    const {name,password,roles}=req.body;
    if(roles=='doctor'){
        
        const newDoctor=new Doctor({name:name,password:password,roles:roles});
      await   newDoctor.save().then(doc=>{
          
            // res.status(200).send("Status:User created");
            // res.status(200).json("User registered");
            res.status(200).send({status:'ok',success:true});
        });

    }else if(roles=='patient'){
        
        const newPatient=new Patient({name:name,password:password,roles:roles});
      await  newPatient.save().then(pat=>{
            
            res.status(200).send("Status:User created");
            
        });
    }
});
app.post('/login',async (req,res)=>{
    const {name,password,roles}=req.body;
    if(roles=='doctor'){
        await Doctor.findOne({name:name}).then(doc=>{
            if(doc){
                if(doc.password==password){
                    const token=jwt.sign(doc.toObject(),secretKey,{expiresIn:'1h'});
                    res.status(200).json({status:'Ok',success:true,token:token});
                    // res.status(200).send('Status:Ok');
                    
                }else{
                    // res.status(401).send('Status:Unauthorized');
    res.status(401).json({status:'Unauthorized',success:false});
                }
            }else{
               res.status(404).json({status:'Bad Request',success:false});
            }
        })
    }else if(roles=='patient'){
        await Patient.findOne({name:name}).then(pat=>{
            if(pat){
                if(pat.password==password){
                    const token=jwt.sign(pat.toObject(),secretKey,{expiresIn:'1h'});
                    res.status(200).json({status:'Ok',success:true,token:token});
                    
                      
                }else{
                    res.status(401).json({status:'Unauthorized',success:false});
                }
            }else{
                res.status(404).json({status:'Bad Request',success:false});
            }
        })
    }
});

app.post('/addpatients',authenticate,async(req,res)=>{
   const doc=req.user.name;
   const {name}=req.body;
   await Doctor.findOne({name:doc}).then(doc=>{
    Patient.findOne({name:name}).then(pat=>{
        if(pat){
            doc.patient.push(pat);
            doc.save().then(dc=>{
                res.status(200).send("Patient saved");
            }).catch(err=>{
                console.log(err);
                res.status(400).send("Error");
            });
        }else{
            res.send("Register the patient first");
        }
    })
   
    });

   });
app.get('/patlist',authenticate,async(req,res)=>{
    const doc=req.user.name;
 
    const list=await Doctor.findOne({name:doc}).populate('patient');
    res.json({"pat":list.patient});
    
 
});

app.get('/doclist',authenticate,async (req,res)=>{
    const pat=req.user.name;
   const list=await  Patient.findOne({name:pat}).populate('doctor');
   res.json({"doc":list.doctor});
       
});
app.post('/adddoctor',authenticate,async (req,res)=>{
    const pat=req.user.name;
    const {name}=req.body;
    await Patient.findOne({name:pat}).then(pat=>{
        Doctor.findOne({name:name}).then(doc=>{
            if(doc){
                pat.doctor.push(doc);
                pat.save().then(dc=>{
                    res.status(200).send("Status:Doctor added");
                }).catch(err=>{
                    res.send(400).send(err);
                });
                
            }else{
                res.status(404).send("Status: Invalid Doctor");
            }
        })
    })
});

app.listen(port,(req,res)=>{
    console.log(`Server Started at port ${port}`);
});
