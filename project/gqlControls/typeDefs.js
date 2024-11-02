import { ApolloServer, gql } from "apollo-server";


//typeDefs can be seen as the schema with some added flexiblity.


export const typeDefs = gql`
    type Query {
        # the recievedData parametre here indicates the other type variable mentioned below.
        # It generally means how the data sent using the key e.g. 'items' will be handled.

        items : [recivedData] 
        # Data within a wrapped array indicates that the data sent using this schema name thru resolvers.
        # resolvers will send a array of items that the type e.g. "recivedData" 's  schema deifines. 
        users : [userSchema]
        getPersonalMessages(receiverID : String!) : [sentMessage]
        user(ID : ID!) : userSchema
        item(ID : ID!) : recivedData
        foods : [recivedData]
        food(ID : ID!) : recivedData
        allTodos : [Todo]
    }

    type userSchema {
        name : String!
        email : String!
    }

    type Todo {
        task : String!
        by : ID!
    }

    input createNewUser{
        name : String!
        email : String!
        password : String!
    }

    input inputForNewItem {
        name : String!
    }

    input todoSchema {
        task : String!
    }

    input SBotSchema {
        botName : String!
        botOwner : String!
    }

    type SBotSchemaOutPut {
        botName : String!
        botOwner : String!
    }

    input userInfoSchema {
        email : String!
        password : String!
    }

    type genaratedToken {
        name : String!
        token : String!
    }

    input msgSchema { 
        text : String!
        receiverID : String!
    }

    type sentMessage {
        id : ID!
        text : String!
        receiverID : String!
        senderID : String!
        createdAt : String!
    }

    type Mutation {
        createNewSexBot(newSBot : SBotSchema! ) : SBotSchemaOutPut
        createMessage(newMsg : msgSchema!) : sentMessage
        createNewUser(newUser : createNewUser! ) : userSchema
        loginUser(userInfo : userInfoSchema!) : genaratedToken
        createNewItem(newItem : inputForNewItem! ) : recivedData
        createNewFood(newFood : inputForNewItem! ) : recivedData
        createNewTodo(newTodo : todoSchema! ) : Todo
    }

    # Explicitly returning the name key value of the received data from the resolver.
    type recivedData {
        name : String
    }

`