import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        optionOne: {
            type: String,
            required: true,
        },
        optionTwo: {
            type: String,
            required: true,
        },
        optionThree: {
            type: String,
            required: true,
        },
        optionFour: {
            type: String,
            required: true,
        },
        correctOption: {
            type: Number,
            required: true,
        },
        questionType: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true
    }

);

export const Question = mongoose.model('Question',QuestionSchema);