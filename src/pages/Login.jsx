import { useDispatch, useSelector } from "react-redux";
import { authorization, login,logout } from "../slices/authSlice";

export default function Login() {
  const user = useSelector(authorization);
  const dispatch = useDispatch();
  // console.log(user);
  const login2 = ()=>{
    dispatch(login({user:"indentor",isLoggedIn:true,token:"indenter"}))
  }

  return (
    <>
      <div>
      <h1>Login page {user.user}</h1>
      <div className="d-flex justify-content-center gap-2">

      <button className="btn btn-primary"onClick={() => dispatch(login({user:"indentor",isLoggedIn:true,token:"indenter"}))}>Login</button>
      <button className="btn btn-danger"onClick={() => dispatch(logout())}>Logout</button>
      </div>
      </div>
    </>
  );
}
