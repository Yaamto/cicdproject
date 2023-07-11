import mongoose from "mongoose";

export interface IIngredient {
    _id: string
    name: string,
    quantity: number,
    protein_per_100: number,
    carbohydrate_per_100: number,
    lipid_per_100: number,
    unity: string,
    created_at: Date
}

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    protein_per_100: {
        type: Number,
        required: [true, "Protein is required"]
    },
    carbohydrate_per_100: {
        type: Number,
        required: [true, "Carbohydrate is required"]
    },
    lipid_per_100: {
        type: Number,
        required: [true, "Lipid is required"]
    },
    unity: {
        type: String,
    }
},{ timestamps: true}
)  

export const Ingredient = mongoose.model("ingredient", IngredientSchema);