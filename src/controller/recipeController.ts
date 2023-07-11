import * as recipeService from "../service/recipeService";
import { Request, Response } from 'express';

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
        const data: any = await recipeService.create(req.body, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
       return res.status(201).json({data})
    }catch(e){
        return res.status(400).json({error: e})
    }
}

export const deleteRecipe = async(req: Request, res: Response) => {
    try {
        
        const data: any = await recipeService.deleteRecipe(req.params.id, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data: `${data.name} deleted successfully`})
    }catch(e){
        return res.status(400).json({error: e})
    }
}

export const findOne = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.findOne(req.params.id)
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(e){
        return res.status(400).json({error: e})
    }
}

export const update = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.update(req.params.id, req.body, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(e){
        return res.status(400).json({error: e})
    }
}