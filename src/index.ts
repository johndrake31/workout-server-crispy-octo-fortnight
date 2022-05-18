import express from 'express';
import mongoose from 'mongoose';
import { typeDefs } from './gql/schema';
import { resolvers } from './gql/resolvers';
import { startApolloServer } from './startApolloServer';
import { connectDatabase } from './connectDataBase';

connectDatabase();
startApolloServer(typeDefs, resolvers).then(() => {
 console.log(' Server ready at http://localhost:4000/graphql 🚀🚀🚀');   
});