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

  export const findRandom = async() => {
    const randomNumber = Math.floor(Math.random() * 5) + 1
    try {
        //Récupération d'un nombre aléatoire d'ingrédients
        const ingredients: IIngredient[] = await Ingredient.aggregate([{ $sample: { size: randomNumber } }])

        const newIngredients = []
        //Création des ingrédients à partir des ingrédients aléatoires
        for(let i = 0; i < ingredients.length; i++){
            const newIngredient= new Ingredient({
                name: ingredients[i].name,
                quantity: ingredients[i].quantity,
                protein_per_100: ingredients[i].protein_per_100,
                carbohydrate_per_100: ingredients[i].carbohydrate_per_100,
                lipid_per_100: ingredients[i].lipid_per_100,
                unity: ingredients[i].unity
            })
            //Sauvegarde des ingrédients et ajout dans un tableau
            if(newIngredient){
                await newIngredient.save()
                newIngredients.push(newIngredient)
            }
        }
        return newIngredients
    }catch(error){
        return error
    }
}