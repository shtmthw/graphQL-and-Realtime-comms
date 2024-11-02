import { itemData, foodData, todoList, users } from "./testMockDB.js"
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
// import env from 'dotenv'
import { env } from 'node:process';
import { type } from "node:os";

const prisma = new PrismaClient();
export const resolvers = {
    Query: {

        //Here we are sending the itemData arr to be schema using the 'items' key value, soin the schema it will be handled accrodingly 
        allTodos: () => todoList,
        getPersonalMessages : async(_, { receiverID } , { userID })=>{
            if (!userID) {
                console.log(userID)
                throw new Error("Login To Continue!!")
            
            }
            if(!receiverID){
                throw new Error("Receiver Id not given!")
            }
            const receiverId = Number(receiverID)
            const exchangedMessages = await prisma.messages.findMany({
                where : {
                    OR : [
                        {receiverID : receiverId , senderID : userID},
                        {senderID : receiverId , receiverID : userID}   
                    ]
                }
            })
            return exchangedMessages
        },
        items: () => itemData,
        //sending the individual item to the schema
        item: (parent, { ID }, context) => {
            return itemData.find(item => item.id == ID)
        },
        users: async (_, args ,  { userID } ) => {
            if (!userID) {
                console.log(userID)
                throw new Error("Login To Continue!!")
            
            }
            console.log(userID)
            const users = await prisma.user.findMany({ where: { id: { not: userID } } })
            return users
        },

        user: (parent, { ID }, context) => {
            return users.find(user => user.id == ID)
        },
        //using a different array, that will also work becuase the defiend feilds on the schema are indeed matching
        food: (parent, { ID }, context) => {
            return foodData.find(item => item.id == ID)
        },
        foods: () => {
            return foodData
        }
    },
    // userSchema: {
    //     todos: (parent) => {
    //         return todoList.filter((item) => parent.id == item.by)
    //     }
    // },
    Mutation: {
        createMessage : async(_,{ newMsg } , { userID }) => {
            if(!userID) {
                throw new Error('Please Login To Sent a Message!')
            }
            if(newMsg.text.includes(" ") || newMsg.text.length < 1){
                throw new Error("Message Can't Be Emmpty")
            }
            const message = await prisma.messages.create({
                data : {
                    text : newMsg.text
                    ,receiverID : Number(newMsg.receiverID)
                    ,senderID : userID
                }
            })
            return message
        
        },
        loginUser: async (_, { userInfo }) => {
            if (!userInfo.email || !userInfo.password) {
                throw new Error('Please Fill The Required Fields.')
            }
            const userExist = await prisma.user.findUnique({ where: { email: userInfo.email } })
            if (!userExist) {
                throw new Error('Email or Password Incorrect')
            }
            const comparedPass = await bcrypt.compare(userInfo.password, userExist.password)
            if (!comparedPass) {
                throw new Error("Email or Password Incorrect")
            }
            const token = jwt.sign({ userID: userExist.id }, "veryverytopsecret")
            const data = {
                name: userExist.name,
                token: token
            }
            return data
        },
        createNewSexBot: async (_, { newSBot }) => {
            // try {
            if (!newSBot.botName || !newSBot.botOwner) {
                throw new Error('Error In Field Validation, must include full filled attributes')
            }
            const botExists = await prisma.sexbots.findUnique({ where: { botName: newSBot.botName } })
            if (botExists) {
                throw new Error('Bot with this name already exists.')
            }
            const newBot = await prisma.sexbots.create(
                {
                    data: {
                        botName: newSBot.botName,
                        botOwner: newSBot.botOwner
                    }
                }
            )
            return newBot


            // } catch (e) {
            //     throw new Error('Error In Catch Block [e] : ', e)
            // }
        },
        createNewTodo: (_, { newTodo }) => {
            const todoData = {
                by: Math.floor(Math.random(10))
                , ...newTodo
            }
            todoList.push(todoData)
            return todoData
        },

        createNewItem: (_, { newItem }, context) => {
            const item = {
                id: Math.random(),
                ...newItem
            }
            itemData.push(item)
            return item
        },
        createNewFood: (_, { newFood }, context) => {
            const item = {
                id: Math.random(),
                ...newFood
            }
            foodData.push(item) 
            return item
        },
        createNewUser: async (_, { newUser }) => {
            // Check if user already exists by email
            const existingUser = await prisma.user.findUnique({
                where: { email: newUser.email }
            });

            if (existingUser) {
                throw new Error('User already exists!');
            }

            // Hash the password before saving the user
            const hashedPassword = await bcrypt.hash(newUser.password, 10);

            // Create and save the new user with hashed password
            const createdUser = await prisma.user.create({
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    password: hashedPassword,
                    createdAt: new Date()  // ensure you set a default date
                }
            });

            return createdUser;
        }

    }
}
