import { ApolloServer, gql } from "apollo-server";


//typeDefs can be seen as the schema with some added flexiblity.


export const typeDefs = gql`
    type Query {
        # the recievedData parametre here indicates the other type variable mentioned below.
        # It generally means how the data sent using the key e.g. 'items' will be handled.

        items : [recivedData] 
        users : [userSchema]
        user(ID : ID!) : userSchema
        item(ID : ID!) : recivedData
        foods : [recivedData]
        food(ID : ID!) : recivedData
        allTodos : [Todo]
    }

    type userSchema {
        name : String!
        age : String!
        todos : [Todo]
    }

    type Todo {
        task : String!
        by : ID!
    }

    input inputForNewItem {
        name : String!
    }

    input todoSchema {
        task : String!
    }

    type Mutation {
        createNewItem(newItem : inputForNewItem! ) : recivedData
        createNewFood(newFood : inputForNewItem! ) : recivedData
        createNewTodo(newTodo : todoSchema! ) : Todo
    }

    # Explicitly returning the name key value of the received data from the resolver.
    type recivedData {
        name : String
    }

`