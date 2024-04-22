const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');



const Doctor = require('./models/doctor_model');
const Admin=require('./models/admin_model');
const Patient = require('./models/patient_model');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes=require('./routes/adminRoutes');
const generalRoutes=require('./routes/generalRoutes');
const pdfRoutes=require('./routes/pdfRoutes');
const app = express();



const port = 1000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/admin',adminRoutes);
app.use('/general',generalRoutes);
app.use('/pdf',pdfRoutes);
app.use('/upload',express.static("upload"));




const secretKey = "Thisissecret";

mongoose.connect('mongodb://127.0.0.1:27017/medwise');



app.get('/', (req, res) => {
    res.send("hello");
});


app.post('/login', async (req, res) => {
    const { name, password, roles } = req.body;
    if (roles == 'doctor') {
        await Doctor.findOne({ email: name }).then(doc => {
            if (doc) {
                if (doc.password == password) {
                    
                    const token = jwt.sign(doc.toObject(), secretKey, { expiresIn: '1h' });
                    res.status(200).json({ status: 'Ok', success: true, token: token });


                } else {

                    res.status(401).json({ status: 'Unauthorized', success: false });
                }
            } else {
                res.status(404).json({ status: 'Bad Request', success: false });
            }
        })
    } else if (roles == 'patient') {
        await Patient.findOne({ email: name }).then(pat => {
            if (pat) {
                if (pat.password == password) {
                    const token = jwt.sign(pat.toObject(), secretKey, { expiresIn: '1h' });
                    res.status(200).json({ status: 'Ok', success: true, token: token });


                } else {
                    res.status(401).json({ status: 'Unauthorized', success: false });
                }
            } else {
                res.status(404).json({ status: 'Bad Request', success: false });
            }
        })
    }else if(roles=='admin'){
         await Admin.findOne({name:name}).then(ad=>{
            if(ad){
                if(ad.password==password){
                    const token=jwt.sign(ad.toObject(),secretKey,{expiresIn:'1h'});
                    res.status(200).json({success:true,status:"Ok",token:token});
                }else{
                    res.status(401).json({status:"Unauthorized",success:false});
                }
            }else{
                res.status(404).json({success:false,status:"Bad Request"});
            }
         })
    }else{
        res.status(403).json({success:false,status:"Invalid Role"});
    }
});







app.listen(port, (req, res) => {
    console.log(`Server Started at port ${port}`);
});
