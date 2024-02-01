const patient=require('../models/patient_model')
const mongoose =require('mongoose')
const Schema=mongoose.Schema;

const doctorSchema=mongoose.Schema({
    name:String,
    password:String,
    catogory:String,
    roles:String,
    patient:[{
        type:Schema.Types.ObjectId,
        ref:'Patient'
    }],

});
module.exports=mongoose.model('Doctor',doctorSchema);
