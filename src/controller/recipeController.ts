import * as recipeService from "../service/recipeService";
import { Request, Response } from 'express';

export const findAll = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.findAll()
        if(data instanceof Error){
            return res.status(404).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const create = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.create(req.body, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
       return res.status(201).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const deleteRecipe = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.deleteRecipe(req.params.id, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data: `${data.name} deleted successfully`})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const findOne = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.findOne(req.params.id)
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const update = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.update(req.params.id, req.body, res.locals.user._id.toString())
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const analyze = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.analyze(req.params.id)
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const random = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.random(res.locals.user._id.toString())
        if(data instanceof Error) {
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}

export const analyzeObject = async(req: Request, res: Response) => {
    try {
        const data: any = await recipeService.analyzeObject(req.body)
        if(data instanceof Error){
            return res.status(400).json({error: data.message})
        }
        return res.status(200).json({data})
    }catch(error){
        return res.status(400).json({error: error})
    }
}