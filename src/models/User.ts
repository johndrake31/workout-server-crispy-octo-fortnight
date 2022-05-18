import mongoose from "mongoose";

interface IUser{
    email: string;
    password: string;
    createWorkout?:string[];
    roles?:string[];
}

const Schema = mongoose.Schema;
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    createWorkout: [{type: String}],
    roles: [{type: String}]
})

export default mongoose.model('User', userSchema);