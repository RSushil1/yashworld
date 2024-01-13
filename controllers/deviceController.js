import deviceModel from "../models/deviceModel.js";
import dotenv from "dotenv";

dotenv.config();

export const createDeviceController = async (req, res) => {
  try {
    const { name, type, status } = req.body;
    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !type:
        return res.status(500).send({ error: "Type is Required" });
      case !status:
        return res.status(500).send({ error: "Status is Required" });     
    }

    const devices = new deviceModel({ ...req.body});
    await devices.save();
    res.status(201).send({
      success: true,
      message: "device Created Successfully",
      devices,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing device",
    });
  }
};

//get all devices
export const getDeviceController = async (req, res) => {
  try {
    const devices = await deviceModel
      .find({})
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: devices.length,
      message: "All devices ",
      devices,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting devices",
      error: error.message,
    });
  }
};

//delete controller
export const deleteDeviceController = async (req, res) => {
  try {
    await deviceModel.findByIdAndDelete(req.params.pid);
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

//upate device
export const updateDeviceController = async (req, res) => {
  try {
    const { name1, type1, status1 } = req.body;
    console.log(req.body)
    //Validation
    switch (true) {
      case !name1:
        return res.status(500).send({ error: "Name is Required" });
      case !type1:
        return res.status(500).send({ error: "Type is Required" });
      case !status1:
        return res.status(500).send({ error: "Status is Required" });
    }

    const devices = await deviceModel.findByIdAndUpdate(
      req.params.pid,
      { name: name1, type: type1, status: status1 }, 
      { new: true }
    );
    await devices.save();
    res.status(201).send({
      success: true,
      message: "device Updated Successfully",
      devices,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte device",
    });
  }
};

