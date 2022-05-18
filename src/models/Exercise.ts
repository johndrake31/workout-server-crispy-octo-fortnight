import mongoose from 'mongoose';

export interface IExercise {
    uuid?:string;
    title: string;
    sets: number[];
    weight: number;
    timed?: boolean;
    timer?: number | null;
    metric?: boolean;
    notes?: string | null;
    reps?: number[];
    uri?: string;
    imgUrl?: string | null;
    workoutId?: any
  }

const Schema = mongoose.Schema;
const exerciseSchema = new Schema<IExercise>({
    uuid: { type: String },
    title: {
        type: String,
        required: true
    },
    sets: [{ type: Number }],
    weight: { type: Number },
    timed: { type: Boolean },
    timer: { type: Number },
    metric: { type: Boolean },
    notes: { type: String },
    reps: [{ type: Number }],
    uri: { type: String },
    imgUrl: { type: String },
    workoutId: {type: String}
});

export default mongoose.model('Exercise', exerciseSchema);