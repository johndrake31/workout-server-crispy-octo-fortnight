import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type Exercise {
		_id: ID!
		title: String!
		sets: [Float]
		weight: Float
		timed: Boolean
		timer: Float
		metric: Boolean
		notes: String!
		reps: [Float]
		uri: String
		imgUrl: String
		uuid: String
		workoutId: String!
	}

	type Workout {
		_id: ID!
		mainTitle: String
		discriptionShort: String
		discriptionExtra: String
		weekDuration:  [Float]
		restBreakSecs: Float
		daysPerWeek:  [Float] 
		imgUrl: String
		creator: User!
	}

	type User {
		_id: ID!
		email: String!
		password: String!
	}

	input ExerciseInput {
		title: String!
		sets: [Float]
		weight: Float
		timed: Boolean
		timer: Float
		metric: Boolean
		notes: String
		reps: [Float]
		uri: String
		imgUrl: String
		uuid: String
		workoutId: String!
	}

	input WorkoutInput {
		mainTitle: String!
		discriptionShort: String
		discriptionExtra: String
		weekDuration:  [Float]
		restBreakSecs: Float
		daysPerWeek:  [Float] 
		imgUrl: String
		creator: String!
	}

	input UserInput {
		email: String!
		password: String!
	}

	type Query {
		getAllWorkouts: [Workout!]!
		getAllExercises: [Exercise!]!
		getAllUsers: [User!]!
		getUserById(UserId: String): User!		
		getUserByEmail(email:String): User!
	}

	type Mutation {
		createWorkout(
			mainTitle: String!
			discriptionShort: String
			discriptionExtra: String
			weekDuration:  [Float]
			restBreakSecs: Float
			daysPerWeek:  [Float] 
			imgUrl: String
			creator: String!
		): Workout

		CreateExercise(
			title: String!
			sets: [Float]
			weight: Float
			timed: Boolean
			timer: Float
			metric: Boolean
			notes: String
			reps: [Float]
			uri: String
			imgUrl: String
			uuid: String
			workoutId: String!
		): Exercise
		createUser(email: String, password: String): User
		updateUser(email: String, password: String): User
		deleteUser(email: String!): User
	}
`;
