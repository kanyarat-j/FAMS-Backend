const { BadRequestError, UnauthorizedError } = require("../middlewares/errors");
const { hashPassword, checkPassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");
const {
  wrapUpResponseData,
  getRequestToken,
  checkUserLogin,
} = require("../utils/utils");
const User = require("../models/user");
const UserLogin = require("../models/userLogin");

// collect only middleware user in route user

async function registerUser(req, res, next) {
  try {
    const body = req.body;
    const { firstname, lastname, email, password } = body;

    if (email.split("@").length - 1 > 1) {
      throw new BadRequestError(`Invalid email ${email}`);
    }

    // check DB
    const existUser = await User.findOne({ email }); // if not found email return null
    if (existUser) {
      throw new BadRequestError(`email ${email} is already registered`);
    }

    // hash password
    const encryptedPassword = await hashPassword(password);

    // save to DB
    const newUser = new User({
      email,
      password: encryptedPassword,
      firstname,
      lastname,
    });
    await newUser.save();

    //send response
    const output = wrapUpResponseData(
      "complete",
      { email, firstname, lastname },
      201
    );
    res.status(201).json(output);
  } catch (error) {
    next(error);
  }
}

async function getUserDetail(req, res, next) {
  try {
    const token = getRequestToken(req);

    const email = req.email;
    // console.log("email", email);

    // check DB
    const existUser = await User.findOne({ email }); // if not found email return null
    if (!existUser) {
      throw new BadRequestError(`Not found email ${email}`);
    }

    const output = wrapUpResponseData(
      "complete",
      {
        email,
        firstname: existUser.firstname,
        lastname: existUser.lastname,
        nickname: existUser.nickname,
        weight: existUser.weight,
        height: existUser.height,
        gender: existUser.gender,
        DOB: existUser.DOB,
      },
      200,
      token
    );
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function updateUserDetail(req, res, next) {
  try {
    const token = getRequestToken(req);
    const verifiedEmail = req.email; // from verifyToken middleware

    const body = req.body;
    const {
      firstname,
      lastname,
      email,
      nickname,
      weight,
      height,
      gender,
      DOB,
    } = body;

    if (verifiedEmail !== email) {
      throw new UnauthorizedError(`Unauthorized`);
    }

    // check DB
    let existUser = await User.findOne({ email }); // if not found email return null
    if (!existUser) {
      throw new BadRequestError(`Not found email ${email}`);
    }

    const genders = ["m", "f"]; // default array

    // validate weight & height
    if (weight <= 0 || height <= 0) {
      throw new BadRequestError(`Invalid weight or height`);
    } else if (!genders.includes(gender.toLowerCase().trim())) {
      throw new BadRequestError(`Invalid gender. gender must be 'M' or 'F'`);
    } else if (DOB.trim() == "") {
      throw new BadRequestError(`Invalid date of birth.`);
    } else if (firstname.trim() == "" || lastname.trim() == "") {
      throw new BadRequestError(`Invalid firstname or lastname.`);
    }

    await existUser.updateOne({
      firstname,
      lastname,
      email,
      nickname,
      weight,
      height,
      gender,
      DOB,
    });

    const output = wrapUpResponseData(
      "complete",
      {
        firstname,
        lastname,
        email,
        nickname,
        weight,
        height,
        gender,
        DOB,
      },
      200,
      token
    );
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const body = req.body;
    const { email, password } = body;
    // console.log('body', body)
    // check DB
    const existUser = await User.findOne({ email }); // if not found email return null
    if (!existUser) {
      throw new BadRequestError(`Invalid email or password.`);
    }

    // check password
    const match = await checkPassword(password, existUser.password);
    if (!match) {
      throw new BadRequestError(`Invalid email or password.`);
    }

    // valid password
    // create token

    const loginedUser = await checkUserLogin(email);
    if (!loginedUser) {
      // not login yet
      await UserLogin.create({
        email,
      });
    }
    const token = createToken(email);

    const output = wrapUpResponseData("login complete", {}, 200, token);
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const email = req.email; // from verifyToken middleware

    await UserLogin.deleteOne({ email });

    const output = wrapUpResponseData("logout complete", {}, 200);
    res.status(200).json(output);
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  getUserDetail,
  updateUserDetail,
  login,
  logout,
};
