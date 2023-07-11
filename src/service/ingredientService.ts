import {Ingredient, IIngredient} from "../model/ingredientModel"

export const create = async(data: IIngredient) => {
    try {
        const newIngredient = new Ingredient(data)
        if(newIngredient){
            return await newIngredient.save()
        }
    }catch(e){
        throw new Error("Error on creating ingredients")
    }
}

export const deleteMany = async(data: any[]) =>{
    try {
        return await Ingredient.deleteMany({ _id: { $in: data } });
    }catch(e){
        return e
    }
}

// Service pour la mise à jour d'un ingrédient
export const updateIngredient = async (ingredientId: string, updatedData: IIngredient) => {
    try {
      const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientId, updatedData, { new: true });
      return updatedIngredient;
    } catch (error) {
      return error;
    }
  };