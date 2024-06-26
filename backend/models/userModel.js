import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true
    }

);

export const Usuario = mongoose.model('Usuario',UserSchema);