const mongoose= require('mongoose');
const Patient=require('../models/patient_model');
const Schema=mongoose.Schema;
 
const pdfSchema=mongoose.Schema({
    name:String,
    data:Buffer,
    patient:[{
       type:Schema.Types.ObjectId,
       ref:'Patient'
    }]
});
module.exports=mongoose.model('Pdf',pdfSchema);