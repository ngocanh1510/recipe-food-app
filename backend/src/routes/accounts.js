import express from 'express'
import { register, login } from "../controllers/auth.js";

const AccountRouter = express.Router();

AccountRouter.post("/register", register);

AccountRouter.post("/login", login);

export default AccountRouter;