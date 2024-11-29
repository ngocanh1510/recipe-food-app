import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AccountModel } from '../models/Account';

const router = express.Router();

router.post("/register", async(req, res) => {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({ username });

    res.json(account);
});


export {router as AccountRouter}