import mongoose from "mongoose";
import { IRecipe } from "./recipeModel";

export interface IStep {
    _id: string,
    description: string,
    order: number,
    recipe: IRecipe,
    created_at: Date
}

const StepSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    order: {
        type: Number,
        required: [true, "Order is required"]
    },
    recipe: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "recipe",
        required: [true, "Recipe is required"]
    }
    
},{
    timestamps: true
}
)

export const Step = mongoose.model('step', StepSchema)