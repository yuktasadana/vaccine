const slotModel = require("../models/slotModel")

const vaccineSlot = async function(req,res){
    try{
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "request body is empty !!" })
        
        let vaccineSlot = await slotModel.create(data)

        return res.status(201).send({status:true,message:"vaccineSlot created successfully",data:vaccineSlot})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports = {vaccineSlot}