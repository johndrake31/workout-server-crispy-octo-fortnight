import mongoose from "mongoose";

export interface IWorkout {
    mainTitle: string;
    discriptionShort?: string;
    discriptionExtra?: string;
    weekDuration?: number[];
    restBreakSecs: number;
    daysPerWeek?: number[];
    creator?: any;
    createExercise?: any;
    imgUrl?: string;
    _id?: string;
    uuid?: string;
}

const Schema = mongoose.Schema;
const workoutSchema = new Schema<IWorkout>({
    uuid: { type: String },
    mainTitle: { type: String },
    discriptionShort: { type: String },
    discriptionExtra: { type: String },
    weekDuration: [{ type: Number }],
    restBreakSecs: { type: Number },
    daysPerWeek: [{ type: Number }],
    imgUrl: { type: String },
    creator: {type: String},
    createExercise: [{ type: String }]

});

export default mongoose.model('Workout', workoutSchema);