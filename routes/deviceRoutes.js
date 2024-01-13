import express from "express";
import {
  createDeviceController,
  deleteDeviceController,
  getDeviceController,
  updateDeviceController,
} from "../controllers/deviceController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
router.post(
  "/create-device",
  requireSignIn,
  isAdmin,
  createDeviceController
);
//routes
router.put(
  "/update-device/:pid",
  requireSignIn,
  isAdmin,
  updateDeviceController
);

//get devices
router.get("/get-devices", getDeviceController);

//delete device
router.delete("/delete-device/:pid", deleteDeviceController);


export default router;
