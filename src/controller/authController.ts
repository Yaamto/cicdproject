import { IUser } from '../model/userModel';
import * as userService from '../service/authService';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    try {
        const data = await userService.register(req.body as any);
        if(data instanceof Error){
            return res.status(400).json({error: data.message});
        }
        return res.status(201).json({data});
    }catch(e){
        return res.status(400).json({error: e})
    }
} 

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    const data: any = await userService.login(email, password) 
    if(data instanceof Error){
        return res.status(400).json({error: data.message})
    }
    const token = userService.createToken(data._id)
    if(token){
        res.cookie('jwt', token, { httpOnly: true, maxAge });
    }
    return res.status(200).json({user: data, token: token})
}