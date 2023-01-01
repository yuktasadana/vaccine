const mongoose =  require("mongoose")

const slotSchema=new mongoose.Schema({
    // firtDose : { type : Boolean , default : false},
    // secondDose : { type : Boolean , default : false},
    date:{ type : String ,required:true},
    isAvalaible:{type:Boolean,default:true},
    availableVaccines:{
    "10:00 PM to 10:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
    },
     "10:30 AM to 11:00 AM":{
         vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
      },
      "11:00 AM to 11:30 AM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "11:30 AM to 12:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "12:00 PM to 12:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "12:30 PM to 01:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "01:00 PM to 01:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "01:30 PM to 02:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "02:00 PM to 02:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "02:30 PM to 03:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "03:00 PM to 03:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "03:30 PM to 04:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "04:00 PM to 04:30 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     },
     "04:30 PM to 05:00 PM":{
        vaccineDoses:{type :Number,default:0,max:10},
        isBooked:{type:Boolean,default:false}
     }
    }
},{timestamps:true})

module.exports = mongoose.model("Slot" , slotSchema)