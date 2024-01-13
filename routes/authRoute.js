import express from "express";
import {
  registerController,
  loginController,
  getUserController,
  deleteUserController,
  updateUserController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//get users
router.get("/get-users", getUserController);

//delete device
router.delete("/delete-user/:uid", deleteUserController);

//update user
router.put(
  "/update-user/:uid",
  requireSignIn,
  isAdmin,
  updateUserController
);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


export default router;
