const mongoose=require('mongoose')
const Doctor=require('../models/doctor_model')

const Schema=mongoose.Schema
const patientSchema=mongoose.Schema({
name:String,
password:String,
doctor:[{
    type:Schema.Types.ObjectId,
    ref:'Doctor'
}],
roles:String
});
module.exports=mongoose.model('Patient',patientSchema);
