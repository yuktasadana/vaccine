const mongoose = require("mongoose");

//============================// idCharacterValid //============================
const isValidObjectId = function (value) {
  return mongoose.Types.ObjectId.isValid(value);
};

//==========================// isValidString //==================================
const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//==============================// isValidName //===============================
const isValidName = function (name) {
  if (/^[a-z A-Z ]+$/.test(name)) {
    return true;
  }
};

//==============================// isValidMobile //===============================
const isValidMobile = function (phone) {
  if (/^[0]?[6789]\d{9}$/.test(phone)) {
    return true;
  }
};
//==============================// isValidPassword //==============================
const isValidPassword = function (password) {
  if (
    /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{8,15}$/.test(password)
  ) {
    return true;
  }
};

//==============================// isValid-pincode //==============================
const isValidPincode = function (pincode) {
  if (/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode)) return true;
  return false;
};

//=================//isValid-number//=====================================================
const isValidAadharNumber = function (value) {
  let user = /^\d{4}\s\d{4}\s\d{4}$/.test(value);
  return user;
};

//=============================// module exports //==============================

module.exports = {isValidString,isValidName,isValidMobile, isValidObjectId ,
                isValidPassword, isValidPincode,isValidAadharNumber}