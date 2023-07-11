import {Recipe, IRecipe} from "../model/recipeModel"
import {Step, IStep} from "../model/stepModel"
import {Ingredient, IIngredient} from "../model/ingredientModel"
import * as ingredientService from "../service/ingredientService"
import * as stepService from "../service/stepService"
const ObjectId = require('mongodb').ObjectId;


//Récupération de toutes les recettes
export const findAll = async() => {
    const recipes: IRecipe[] = await Recipe.find()
    if(!recipes){
        return new Error("Not found")
    }
    return recipes
}

// Création d'une recette
export const create = async(data: IRecipe) => {
    const {ingredients, steps, user} = data
    let order: number[] = []
    try {
        const newRecipe = new Recipe({
            name: data.name,
            number_of_person: data.number_of_person,
            user: user,
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
        const recipe = (await (await newRecipe.save()).populate("ingredients")).populate("steps")
        
       return recipe
    }catch(e){
        return e
    }
}