const mongoose= require('mongoose');
const Schema=mongoose.Schema;
 
const pdfSchema=mongoose.Schema({
    name:String,
    data:Buffer,
    
});
module.exports=mongoose.model('Pdf',pdfSchema);
// doctor browser?