import { Schema, model } from 'mongoose';


export interface User extends Document {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    tokens: [];
}

// user schema
export const userSchema = new Schema<User>({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
     },
    ],
});

export  const User = model('User', userSchema);