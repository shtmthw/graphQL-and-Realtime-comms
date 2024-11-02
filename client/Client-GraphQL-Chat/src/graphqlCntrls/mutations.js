
import { gql } from "@apollo/client"

export const SIGNUP = gql`
    mutation CreateNewUser($newUser: createNewUser!) {
        createNewUser(newUser: $newUser) {
            name
            email
        }
    }`

export const LOGIN = gql`
    mutation LoginUser($userInfo: userInfoSchema!) {
        loginUser(userInfo: $userInfo) {
            name
            token
        }
    }`


