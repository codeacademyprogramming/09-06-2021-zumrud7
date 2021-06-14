import { Router, Response } from "express";
import { IAuthPayload } from "../interfaces/auth";
import * as yup from "yup";
import UserModel, { login } from "../models/users";
import jwt from "jsonwebtoken";

export const AuthRouter = Router();
const TOKEN = process.env.JWT_KEY || "";

let authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  // createdOn: yup.date().default(function(){
  //     return new Date();
  // }),
});

AuthRouter.post("/register", async (req, res: Response) => {
  const registerhPayload: IAuthPayload = req.body;
  try {
    const validPayload = await authSchema.validate(registerhPayload);
    const newUserObj = new UserModel(validPayload);
    const newUser = await newUserObj.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      createdOn: newUser.createdOn,
    });
  } catch (err) {
    res.status(422).json({ errors: err.errors });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const loginPayload: IAuthPayload = req.body;

  try {
    const validPayload = await authSchema.validate(loginPayload);

    try {
      const user = await login(validPayload.email, validPayload.password);
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        "SHH_its_SECRET"
      );
      res.json({ token });
    } catch (error) {
      res.status(422).json({ errors: error.message });
    }
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
});
