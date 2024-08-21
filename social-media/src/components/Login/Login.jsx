import { Login_user } from "./Login_user";
import {useState} from 'react';
import {useDispatch} from 'react-redux'

function Login(){
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    
    const LoginHandler=(e)=>{
        e.preventDefault();
        usedispatch(Login_user(email,password));
    }
    return(
        <div>
            <form onSubmit={LoginHandler}>
                <input type="email" required onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" required onChange={(e)=>setpassword(e.target.value)}/>
                <button className="btn">Login</button>
                <Link to="/forgotpassword">ForgotPassword</Link>


            </form>
            
        </div>
    )
}
export default Login;