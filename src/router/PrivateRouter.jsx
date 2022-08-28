import { useNavigate } from "react-router-dom";

export const PrivateRouter =({isAuth, children})=> {
    const nav = useNavigate()
    return isAuth
    ? children
    : nav('/')
}