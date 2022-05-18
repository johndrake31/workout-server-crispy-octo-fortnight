import express from "express";
import {ApolloServer} from "apollo-server-express";

export async  function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 });
}