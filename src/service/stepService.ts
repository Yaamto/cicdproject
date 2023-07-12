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

// Service pour la mise à jour d'une étape
export const updateStep = async (stepId: string, updatedData: IStep) => {
    try {
      const updatedStep = await Step.findByIdAndUpdate(stepId, updatedData, { new: true });
      return updatedStep;
    } catch (error) {
      return error;
    }
  };

  export const findRandom = async(recipeId: string) => {
    const randomNumber = Math.floor(Math.random() * 5) + 1
    try {
        //Récupération d'un nombre aléatoire d'étapes
        const steps: IStep[] = await Step.aggregate([{ $sample: { size: randomNumber } }])
        const newSteps = []
        //Création des étapes à partir des étapes aléatoires
        for(let i = 0; i < steps.length; i++){
            const newStep= new Step({
                description: steps[i].description,
                order: i + 1 ,
                recipe: recipeId
            })
            //Sauvegarde des étapes et ajout dans un tableau
            if(newStep){
                await newStep.save()
                newSteps.push(newStep)
            }
            //Ajout de l'ordre dans un tablea
        }
        return newSteps
    }catch(error){
        return error
    }
}