const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const adminScheme=mongoose.Schema({
    name:String,
    password:String,
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    },
    
})
module.exports=mongoose.model('Admin',adminScheme);