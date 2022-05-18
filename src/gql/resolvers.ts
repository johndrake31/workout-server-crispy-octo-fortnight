import mongoose from "mongoose";
import UserModel from "../models/User";
import WorkoutM from "../models/Workout";
import ExerciseM from "../models/Exercise";

export const resolvers = {
	Query: {
		getAllUsers: async () => await UserModel.find({}),
		getUserByEmail: async ({ email }: any) => await UserModel.findOne({ email }),
		getUserById: async (data: any) => await UserModel.findById(data.UserId),
		getAllWorkouts: async () => await WorkoutM.find({}),
		getAllExercises: async () => await ExerciseM.find({}),
	},
	Mutation: {
		createUser: async (_: any, data: any) => {
			await UserModel.init();
			const newUser = new UserModel(data);
			newUser._id = new mongoose.Types.ObjectId();
			// generate a dynamic id
			return await newUser.save();
		},
		deleteUser: async (_: any, { email }: any) => {
			const user = await UserModel.findOne({ email });
			console.log(user);
			if (user) {
				await user.remove();
			}
			return user;
		},
		updateUser: async (_: any, data: any) => {
			await UserModel.init();
			console.log(data);
			const user = await UserModel.findOne({ email: data.email });
			if (user) {
				Object.assign(user, data);
				await user.save();
				return user;
			} else {
				return null;
			}
		},

		CreateExercise: async (_: any, data: any) => {
			const workoutID = await WorkoutM.findById(data.workoutId)
			if (workoutID) {
			await ExerciseM.init();
			const exercise = new ExerciseM(data);
			let createdExercise: any;
			//async opperation
			return exercise
				.save()
				.then((result: any) => {
					//because we need to return the _doc before we move on to updating th user
					createdExercise = { ...result._doc }
					
					return workoutID
				})
				.then(workout => {
					
					workout.createExercise.push(exercise);
					return workout.save()
				})
				.then(result => {
					return createdExercise;
				})
				.catch(
					(err) => {
						console.log(err);
						throw err;
					})
				}else if (!workoutID) {
					throw new Error('Workout not found');
				}
		},
	},
};
