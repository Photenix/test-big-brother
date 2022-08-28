import { typesLogin } from "../types/types";

export const loginReducers =(state = {}, action)=>{    
    switch (action.type) {
        case typesLogin.login:
            return{
                ...state,
                user: {
                    ...action.payload
                }
            }
        case typesLogin.logout:
            return{
                user: ''
            }
           
        default:
            return state
    }

}