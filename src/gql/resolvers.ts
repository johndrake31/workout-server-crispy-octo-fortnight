import mongoose from "mongoose";
import UserModel from "../models/User";
import WorkoutM from "../models/Workout";
import ExerciseM from "../models/Exercise";
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server';

import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

export const resolvers = {
	Query: {
		getAllUsers: async () => await UserModel.find({}),
		getUserByEmail: async ({ email }: any) => await UserModel.findOne({ email }),
		getUserById: async (data: any) => await UserModel.findById(data.UserId),
		getAllWorkouts: async () => await WorkoutM.find({}),
		getAllExercises: async () => await ExerciseM.find({}),
	},
	Mutation: {
		createUser: async (_: any, email: string,
			password: string) => {
				try{
			const userExists = await UserModel.findOne({email});
			if (!userExists) {
				const newUser = new UserModel();
				newUser.password = await bcrypt.hash(password, 12);
				newUser.email = email;
				newUser._id = new mongoose.Types.ObjectId();
				const user =  await newUser.save();
				if(user){
					user.roles?.push('user');
					return jsonwebtoken.sign(
						{  email: user.email, id: user._id },
						process.env.JWT_SECRET!,
						{ expiresIn: '1y' }
					)
				}
			}else{
				throw new Error("User already exists");	
			}
		} catch (error) {
			throw new ApolloError(`${error}`);
		}
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
