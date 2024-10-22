import { ApolloServer, gql } from "apollo-server";
import { typeDefs }  from "./gqlControls/typeDefs.js";
import  { resolvers } from "./gqlControls/resolvers.js";

const server = new ApolloServer({

    typeDefs,

    resolvers,

});
server.listen().then(( { url } )=>{
    console.log('Server started at : ',url)
})
