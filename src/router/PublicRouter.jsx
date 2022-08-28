import { useNavigate } from "react-router-dom";

export const PublicRouter =({isAuth, children})=>{
    const nav = useNavigate()
    return !isAuth
    ? children
    : nav('/')
}