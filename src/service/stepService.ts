import {Step, IStep} from "../model/stepModel"

export const create = async(data: IStep, recipeId: string) => {
    try {
        const newStep = new Step({
            description: data.description,
            order: data.order,
            recipe: recipeId
        })
        
        if(newStep){
            return await newStep.save()
        }
        throw new Error("Error")
    }catch(e){
        throw new Error("Error on creating steps")
    }
}

export const deleteMany = async(data: any[]) =>{
    try {
        return await Step.deleteMany({ _id: { $in: data } });
    }catch(e){
        return e
    }
}