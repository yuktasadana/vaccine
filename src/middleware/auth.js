const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const {isValidObjectId } = require("mongoose")

//athentication

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    if (!token) return res.status(400).send({ status: false, message: "token is required" });
    
    jwt.verify(token, "Arogya_Setu_Cowin", function (error, decodedtoken) {
      if (error)
        return res.status(401).send({ status: false, message: "token is invalid or expired" });

        req.decodedtoken = decodedtoken;
        next();
        });
    
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//authorisation

const authorisation = async function (req, res, next) {
  try {
    let userId = req.params.userId;
    let tokenUserId = req.decodedtoken.userId;

    if (!isValidObjectId(userId)) return res.status(400).send({status: false,message: "Please provide valid UserId for details",});
    
    let findUser = await userModel.findById(userId);

    if (!findUser) return res.status(404).send({ status: false, message: "No user details found with this id" });

    if (tokenUserId != userId)
      return res.status(403).send({status: false,message: "You are not authorised to perform this task",});

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { authenticate, authorisation };