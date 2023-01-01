const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {  type : String ,  required : true  },
    phoneNumber : {  type : String ,  required : true  },
    age : {  type : Number ,  required : true  },
    pincode : {  type : Number ,  required : true  },
    adharCard : {  type : String ,  required : true  },
    password : {  type : String ,  required : true  },
    role : {type : String , default : "user"},
    Vaccination_status : {type : String , enum : ["none","firstDose","secondDose"], default : "none"},
    isDeleted : {type : Boolean , default : false}
})

module.exports = mongoose.model("User",userSchema)