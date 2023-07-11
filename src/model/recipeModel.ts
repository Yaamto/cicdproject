import mongoose from "mongoose";
import { IUser } from "./userModel";
import { IIngredient } from "./ingredientModel";
import { IStep } from "./stepModel";

export interface IRecipe {
    _id: string,
    name: string,
    number_of_person: number,
    user: IUser,
    ingredients: IIngredient[],
    steps: IStep[],
    created_at: Date
}

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    number_of_person: {
        type: Number,
        required: [true, "Number of person is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ingredient"
    }],
    steps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "step",
    }]
}, { timestamps: true}
)

export const Recipe = mongoose.model('recipe', RecipeSchema)