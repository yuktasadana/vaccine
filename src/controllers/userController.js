const userModel = require("../models/userModel")
const slotModel = require("../models/slotModel")
const { authenticate, authorisation } = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const {isValidString,isValidName,isValidMobile,isValidPassword,
    isValidPincode,isValidAadharNumber} = require("../validation/validator")

const register = async function(req,res){
    try {
        let data = req.body
        let {name , phoneNumber ,pincode , password, age,adharCard, role} = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "request body is empty !!" })

        if (! name) return res.status(400).send({status: false , message : "name is mandatory"})
        if (!isValidString(name) || !isValidName(name)) return res.status(400).send({ status: false, message: "please provide valid name" })
        
        if (!phoneNumber) return res.status(400).send({status: false , message : "phoneNumber is mandatory"})
        if (!isValidMobile(phoneNumber)) return res.status(400).send({ status: false, message: "please provide valid number" })
        
        let uniquePhone = await userModel.findOne({phoneNumber:phoneNumber,isDeleted:false})
        if(uniquePhone) return res.status(400).send({status:false,message:"this number is already exists"})
    
        if(!password) return res.status(400).send({status: false , message : "password is mandatory"})
        if(!isValidPassword(password)) return res.status(400).send({status:false,message:"please provide valid or strong password"})
        // data.password=await hash(password,10)
        
        if(!age) return res.status(400).send({status: false , message : "age is mandatory"})
        if (typeof age != "number") return res.status(400).send({ status: false, message: "age should be only Number" })
        
        if (!pincode) return res.status(400).send({status: false , message : "pincode is mandatory"})
        if (!isValidPincode(pincode)) return res.status(400).send({ status: false, message: "please provide valid pincode" })
        
        if (!adharCard) return res.status(400).send({status: false , message : "adharCard is mandatory"})
        if (!isValidAadharNumber(adharCard)) return res.status(400).send({ status: false, message: "please provide the valid aadhar number" })
            
        let uniqueAdharCard =await userModel.findOne({adharCard:adharCard,isDeleted:false})
        if(uniqueAdharCard) return res.status(400).send({status:false,message:"this adharCard is already exists"})
        
        const user = await userModel.create(data)

        return res.status(201).send({status : true , message : "user register successfully" , data : user})
        
    } catch (error) {
        return res.status(500).send({status : false , message: error.message})        
    }
}

const login = async function(req,res){
    try {
        let data = req.body
        let {password , phoneNumber} = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "request body is empty !!" })

        if (!phoneNumber) return res.status(400).send({status: false , message : "phoneNumber is mandatory"})
        if (!isValidMobile(phoneNumber)) return res.status(400).send({ status: false, message: "please provide valid number" })

        let findPhone = await userModel.findOne({phoneNumber:phoneNumber,isDeleted:false})
        if(!findPhone) return res.status(400).send({status : false , message : "phone number not exist"})
        
        if(!password) return res.status(400).send({status: false , message : "password is mandatory"})
        if(!isValidPassword(password)) return res.status(400).send({status:false,message:"please provide valid or strong password"})
        if(password != findPhone.password) return res.status(400).send({status:false,message:"Incorrect password !!"})

        let findUser = await userModel.findOne({phoneNumber : phoneNumber , password : password})
        
        let token = jwt.sign(
            {   
                userId : findUser._id.toString(),
                role : findUser.role
            },
                
            "Arogya_Setu_Cowin",
            {expiresIn : '2h'}
            )

        if(!findUser) return res.status(400).send({status : false , message : "user not exist"})

        return res.status(200).send({status: true , 
                    message : "user login successfully", 
                    data : {
                        userId : findUser._id.toString(),
                        token: token}})
    } catch (error) {
        return res.status(500).send({status : false , message: error.message})               
    }
}

const getUsers = async function (req,res){
    try{
    let query = Object.keys(req.query)

    if(query.length > 0){
        let itsValid = ["age","Vaccination_status","pincode"]
        query.map((x)=>{
            if(!itsValid.includes(x)) return res.status(400).send({status:false,message:`${x} is not valid key for filter the data`})
            })

        query.isDeleted=false

        let filter = req.query

        let users = await userModel.find(filter)

        if(!users) return res.status(404).send({status:false,message:"no any user found"})
        
        return res.status(200).send({status:true,message:"list of users",data:users})
    
    }else{

        let users=await userModel.find({isDeleted:false})

        if(!users) return res.status(404).send({status:false,message:"no any user found"})
        
        return res.status(200).send({status:true,message:"list of users",data:users})
    }
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

const availableDates = async function(req,res){
    try{
        let vaccineSlot = await slotModel.find({isAvalaible:true}).select({date:1,_id:0})

        if(!vaccineSlot) return res.status(404).send({status:false,message:"no any slots found"})
    
        return res.status(200).send({status:true,message:"list of available dates for vaccination",dates:vaccineSlot})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const availableTiming = async function(req,res){
    try{
        const {date} = req.body
        let vaccineSlot = await slotModel.findOne({isAvalaible:true,date:date})

        let availableVaccines = vaccineSlot.availableVaccines

        let availableTiming = []

        for (let key in availableVaccines ) {
            const element = availableVaccines[key];

            if(element.vaccineDoses<10 && element.isBooked==false){
                availableTiming.push(key)
            }
        }

        if(!availableTiming) { return res.status(400).send({status:false,message:`no any time available in ${date}`})}
        
        return res.status(200).send({status:true,message:`list of available timing for ${date} `,
                            data:{
                                Date:vaccineSlot.date, 
                                availableTiming:availableTiming}})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
 
}

const vaccineRegistration = async function(req,res){
    try {
        const userId = req.params.userId
        const {date,time}=req.body
        
        let bookSlots = await slotModel.findOne({date:date})

        let findUser = await userModel.findById(userId)

        let availableTiming = bookSlots.availableVaccines

        for (let key in availableTiming ) {

            const element = availableTiming[key];

            if(key==time && element.isBooked==false){

                element.vaccineDoses++
                
                if(element.vaccineDoses >= 10){
                    element.isBooked=true
                }
            }
        }

        let status = {Vaccination_status:"none"}

        if(findUser.Vaccination_status=="none") {status.Vaccination_status="firstDose"}
        
        if(findUser.Vaccination_status=="firstDose") {status.Vaccination_status="secondDose"}

        await slotModel.findOneAndUpdate(
                        {date:date},
                        {availableVaccines : availableTiming},
                        {new:true})
        
        await userModel.findOneAndUpdate(
                    {_id:userId},
                    status,
                    {new : true})
        
        return res.status(200).send({status:true,message:`${findUser.name} have successfully register for ${status.Vaccination_status} on ${date}${time}` })
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
module.exports = {register , login , getUsers,availableDates ,  availableTiming , vaccineRegistration}