import * as recipeService from "../service/recipeService";
import { Request, Response } from 'express';
import {IRecipe} from "../model/recipeModel";



export const findAll = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.findAll()
        if(data instanceof Error){
            return res.status(404).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(e){
        return res.status(400).json({error: e})
    }
}

export const create = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.create(req.body)
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
       return res.status(201).json({data})
    }catch(e){
        return res.status(400).json({error: e})
    }
}