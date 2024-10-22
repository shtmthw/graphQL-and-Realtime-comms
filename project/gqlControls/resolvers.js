import { itemData , foodData , todoList , users  } from "./testMockDB.js"



export const resolvers = {
    Query : {

       //Here we are sending the itemData arr to be schema using the 'items' key value, soin the schema it will be handled accrodingly 
       allTodos : () => todoList,
       items :() => itemData,
       //sending the individual item to the schema
       item : (parent , { ID } , context) => {
           return itemData.find(item=>item.id == ID)
       },
       users : () => users,

       user: (parent  , { ID } , context) => {
           return users.find(user => user.id == ID)
       },
       //using a different array, that will also work becuase the defiend feilds on the schema are indeed matching
       food : (parent , { ID }  , context) => {
           return foodData.find(item=>item.id == ID)
       },
       foods : ()  =>  {
           return foodData
       }
   },
   userSchema : {
       todos : (parent) => {
           return todoList.filter((item)=>parent.id == item.by)
       }
   },
   Mutation : {
       createNewTodo : (_,{ newTodo }) => {
           const todoData = {
               by : Math.floor(Math.random(10))
               ,...newTodo
           }
           todoList.push(todoData)
           return todoData
       },

       createNewItem : ( _, { newItem },context) => {
           const item = {
               id : Math.random(),
               ...newItem
           }
           itemData.push(item)
           return item
       },
       createNewFood : (_ ,  { newFood },context)=>{
           const item = {
               id : Math.random(),
               ...newFood
           }
           foodData.push(item)
           return item
       }
   }
}
