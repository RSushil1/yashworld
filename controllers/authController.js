import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, devices, username, status } = req.body;

    // Validations
    if (!name || !email || !password || !phone || !devices || !username || !status) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already registered",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      phone,
      devices,
      username,
      password: hashedPassword,
      status,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    //validation
    if (!email) {
      return res.status(200).send({
        success: false,
        message: "Please enter Email!",
      });
    }
    if (!password) {
      return res.status(200).send({
        success: false,
        message: "Please enter password!",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered! Please Sign Up",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//get all devices
export const getUserController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: users.length,
      message: "All users ",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting users",
      error: error.message,
    });
  }
};

//delete controller
export const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.uid);
    res.status(200).send({
      success: true,
      message: "device Deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting device",
      error,
    });
  }
};

//upate User
export const updateUserController = async (req, res) => {
  try {
    const { name, email, phone, devices, username, status } = req.body;
    // Validations
    if (!name || !email || !phone || !devices || !username || !status) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.uid,
      {name, email, phone, devices, username, status }, 
      { new: true }
    );
    await updatedUser.save();
    res.status(201).send({
      success: true,
      message: "user Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte user",
    });
  }
};


