import { ApolloServer, gql } from "apollo-server";
import { typeDefs }  from "./gqlControls/typeDefs.js";
import  { resolvers } from "./gqlControls/resolvers.js";
import jwt from 'jsonwebtoken'
const server = new ApolloServer({

    typeDefs,
    resolvers,
    context: ( { req } )=>{
        const { authorization } = req.headers
        if( authorization ){
            const { userID } =  jwt.verify(authorization , "veryverytopsecret")
            return  { userID }
        }
    }
});
server.listen().then(( { url } )=>{
    console.log('Server started at : ',url)
})
