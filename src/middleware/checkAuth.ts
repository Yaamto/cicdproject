import { Request, Response } from 'express';
import {User} from '../model/userModel'
import jwt from "jsonwebtoken"

export const checkStore = async (req: Request, res: Response, next: any) => {

    const token = req.cookies.jwt
    const secret = process.env.TOKEN_SECRET
    if (token && secret) {
        jwt.verify(token, secret, async(err: any, decodedToken: any) => {
            if (err) {
                res.locals.store = null;
                res.cookie("jwt", "", { maxAge: 1 });
                return res.json('token not available or expired')
            } 
            const store = await User.findById(decodedToken.id);
            res.locals.store = store;
            if (!res.locals.store) {
                res.cookie("jwt", "", { maxAge: 1 });
                return res.json("you are not logged")
            }
            next();
        });
    } else {
        res.locals.store = null;
        return res.json({ msg: "no token provided" })

    }
}