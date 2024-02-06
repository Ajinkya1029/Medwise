const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const Pdf = require('./models/pdf_model')
const Doctor = require('./models/doctor_model');
const Patient = require('./models/patient_model');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const app = express();



const port = 1000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);


const secretKey = "Thisissecret";

mongoose.connect('mongodb://127.0.0.1:27017/medwise');



app.get('/', (req, res) => {
    res.send("hello");
});

app.post('/register', async (req, res) => {
    const { name, password, roles } = req.body;
    if (roles == 'doctor') {
        const category=req.body.category;
        const newDoctor = new Doctor({ name: name, password: password, roles: roles,category:category });
        await newDoctor.save().then(doc => {

           
            res.status(200).send({ status: 'ok', success: true });
        });

    } else if (roles == 'patient') {

        const newPatient = new Patient({ name: name, password: password, roles: roles });
        await newPatient.save().then(pat => {
            res.status(200).send({ status: 'ok', success: true });

        });
    }
});
app.post('/login', async (req, res) => {
    const { name, password, roles } = req.body;
    if (roles == 'doctor') {
        await Doctor.findOne({ name: name }).then(doc => {
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
        await Patient.findOne({ name: name }).then(pat => {
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
    }
});







app.listen(port, (req, res) => {
    console.log(`Server Started at port ${port}`);
});
