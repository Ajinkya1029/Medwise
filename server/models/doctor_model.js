const patient=require('../models/patient_model')
const mongoose =require('mongoose')
const Schema=mongoose.Schema;

const doctorSchema=mongoose.Schema({
    name:String,
    password:String,
    category:String,
    roles:String,
    mobile:String,
    email:String,
    review:String,
    hospital:[{
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }],
    patient:[{
        type:Schema.Types.ObjectId,
        ref:'Patient'
    }],

});
module.exports=mongoose.model('Doctor',doctorSchema);
