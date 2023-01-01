const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const slotController = require("../controllers/slotController")

const { authenticate, authorisation } = require("../middleware/auth")

/*******************************user registration ***********************/
router.post("/register" ,userController.register)

/*******************************user login  ****************************/
router.post("/login",userController.login)

/*******************************get user  ****************************/
router.get("/users",userController.getUsers)

/******************************* availableDates  ****************************/
router.get("/availableDates",userController.availableDates)

/******************************* availableTiming ****************************/
router.post("/availableTiming",userController.availableTiming)

/******************************* vaccineRegistration ****************************/
router.put("/vaccineRegistration/:userId",authenticate,authorisation,userController.vaccineRegistration)

/******************************* vaccineSlot ****************************/
router.post("/slot",slotController.vaccineSlot)

module.exports = router