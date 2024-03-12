const mongoose =require('mongoose');
const Doctor=require('../models/doctor_model');
const Patient=require('../models/patient_model');
const Schema=mongoose.Schema;
const hospitalSchema=mongoose.Schema({
    name:String,
    address:String,
    mobile:String,
    city:String,
    doctor:[{
        type:Schema.ObjectId,
        ref:'Doctor'
    }],
    Patient:[{
        type:Schema.ObjectId,
        ref:'Patient'
    }],
    admin:{
        type:Schema.Types.ObjectId,
        ref:'Admin'
    }
});
module.exports=mongoose.model('hospital',hospitalSchema);