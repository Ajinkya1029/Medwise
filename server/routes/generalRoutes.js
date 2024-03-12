const express=require('express');
const Doctor=require('../models/doctor_model');
const Hospital=require('../models/hospital_model');
const router=express.Router();



router.get('/doclist',async (req,res)=>{
await Doctor.find().then(dc=>{
    res.status(200).json({success:true,"List":dc,status:"Ok"});
}).catch(err=>{
    res.status(400).json({success:false,status:'Bad Request'});
})
});
router.post('/filterdoclist',async(req,res)=>{
    const {category}=req.body;
    if(category){
        await Doctor.find({category:category}).then(dc=>{
            res.status(200).json({success:true,status:'Ok',"List":dc});
        }).catch(err=>{
            res.status(400).json({success:false,status:"Bad Request"});
        });
    }else{
        await Doctor.find().then(dc=>{
            res.status(200).json({success:true,"List":dc,status:"Ok"});
        }).catch(err=>{
            res.status(400).json({success:false,status:'Bad Request'});
        })
    }
});
router.post('/searchdoclist',async(req,res)=>{
    const {filter}=req.body;
try{
    await Doctor.find({category:filter}).then(dList=>{
        if(!dList){
            res.status(404).json({success:false,status:"Bad Request"});
        }
        const filterList=dList.map(item=>item.toJSON());
        res.status(200).json({success:true,"List":filterList});
    }).catch(err=>{
        res.status(400).json({success:false,status:"Bad Request"});
    });

    
}catch(err){
    
    res.status(400).json({success:false,status:err});
}
});
router.get('/hlist',async (req,res)=>{
  await Hospital.find().then(hp=>{
    res.status(200).json({success:true,"List":hp});
  }).catch(err=>{
    res.status(400).json({success:false});
  })  
});

router.post('/filterhlist',async (req,res)=>{
    const {data}=req.body;
    if(data){
        await Hospital.find({name:data}).then((hp)=>{
            res.status(200).json({success:true,"List":hp});
        }).catch(err=>{
            res.status(400).json({success:false});
        })
    }else{
        res.status(500).json({success:false});
    }
})


router.post('/hoscity',async (req,res)=>{
const city=req.body.id;
await Hospital.find({city:city}).then(hp=>{
    if(hp){
        res.status(200).json({success:true,"List":hp});
    }
}).catch(err=>{
    res.status(400).json({success:false});
})
});



module.exports=router;