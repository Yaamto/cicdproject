import {Recipe, IRecipe} from "../model/recipeModel"
import { IStep } from "../model/stepModel"
import * as ingredientService from "../service/ingredientService"
import * as stepService from "../service/stepService"

//Récupération de toutes les recettes
export const findAll = async() => {
    const recipes: IRecipe[] = await Recipe.find()
    if(!recipes){
        return new Error("Not found")
    }
    return recipes
}

// Création d'une recette
export const create = async(data: IRecipe, userId: string) => {
    const {ingredients, steps} = data
    let order: number[] = []
    try {
        const newRecipe = new Recipe({
            name: data.name,
            number_of_person: data.number_of_person,
            user: userId,
        })
          //vérification en amont qu'il n'y ai pas le même ordre dans les étapes 
        for(let i = 0; i< steps.length; i++){
            if(order.includes(steps[i].order)){
                return new Error("Steps's order must be different")
            }
            order.push(steps[0].order)
        }
        //Boucle permettant la création de toutes les étapes
        for(let i = 0; i< steps.length; i++){
           const step = await stepService.create(steps[i], newRecipe._id.toString())
           if(step){
               newRecipe.steps.push(step._id)
            }
        }
        //Boucle permettant la création de toutes les étapes
        for(let i = 0; i < ingredients.length; i++){
            const ingredient = await ingredientService.create(ingredients[i])  
            if(ingredient){
                newRecipe.ingredients.push(ingredient._id)
            }
        }
        //Populate permet l'hydratation des données, ici il récupère les objets entier des ingrédients et étapes.
        const recipe = (await (await newRecipe.save()).populate("ingredients")).populate("steps")
        return recipe
    }catch(e){
        return e
    }
}
export const deleteRecipe = async (recipeId: string, userId: string) => {
    try {
         // Obtient la recette spécifique
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return new Error("Recipe not found");
        }
        console.log(recipe.user?.toString(), userId)
        // Vérifie si l'utilisateur est le créateur de la recette
        if (recipe.user?.toString() !== userId) {
            return new Error("You are not authorized to delete this recipe");
        }   
        // Supprime la recette
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return new Error("Recipe not found");
        }
        // Supprime les ingrédients associés
        await ingredientService.deleteMany(deletedRecipe.ingredients)
        // Supprime les étapes associées
        await stepService.deleteMany(deletedRecipe.steps);
        return deletedRecipe;
    } catch (e) {
        return e;
    }
  };

export const findOne = async(recipeId: string) => {
    try {
        const recipe = await Recipe.findById(recipeId).populate("ingredients").populate("steps")
        if(!recipe){
            return new Error("Recipe not found")
        }
        return recipe
    }catch(e){
        return e
    }
}

// Fonction de mise à jour de la recette
export const update = async (recipeId: string, updatedData: IRecipe, userId: string) => {
    try {
        //Vérifier que l'utilisateur est bien le créateur de la recette
        if(updatedData.user?.toString() !== userId){
            return new Error("You are not authorized to update this recipe")
        }
      const { ingredients, steps } = updatedData;
      // Met à jour la recette
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
        name: updatedData.name,
        number_of_person: updatedData.number_of_person,
        user: userId,
      });
      if (!updatedRecipe) {
        return new Error("Recipe not found");
      }
      // Met à jour les ingrédients existants
      const updatedIngredients = await Promise.all(
        ingredients.map((ingredient) => ingredientService.updateIngredient(ingredient._id, ingredient))
      );
      // Met à jour les étapes existantes
      const updatedSteps = await Promise.all(
        steps.map((step) => stepService.updateStep(step._id, step))
      );
      // Met à jour les références d'ingrédients et d'étapes dans la recette
      updatedRecipe.ingredients = updatedIngredients.map((ingredient: any) => ingredient._id);
      updatedRecipe.steps = updatedSteps.map((step: any) => step._id);
  
      // Enregistre les modifications de la recette
      await updatedRecipe.save();
  
      // Récupère la recette mise à jour avec les ingrédients et étapes hydratés
      const recipe = await Recipe.findById(updatedRecipe._id)
        .populate("ingredients")
        .populate("steps");
  
      return recipe;
    } catch (error) {
      return error;
    }
  };