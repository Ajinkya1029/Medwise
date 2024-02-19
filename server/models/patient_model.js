const mongoose=require('mongoose')
const Doctor=require('../models/doctor_model')
const Pdf=require('./pdf_model');

const Schema=mongoose.Schema
const patientSchema=mongoose.Schema({
name:String,
password:String,
roles:String,
dob:String,
mobile:String,
email:String,
address:String,
hospital:[{
    type:Schema.Types.ObjectId,
    ref:'Hospital'
}],
doctor:[{
    type:Schema.Types.ObjectId,
    ref:'Doctor'
}],
pdf:[{
    type:Schema.Types.ObjectId,
    ref:'Pdf'
}]

});
module.exports=mongoose.model('Patient',patientSchema);
