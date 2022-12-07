import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ()=>{
    let[token, setToken]= useState("");
    let[email, setEmail] = useState("");
    let[password, setPassword] =useState("");
    const navigate = useHistory();

    const loginSubmit= ()=>{
        var obj = {email: email, password: password};
        axios.post("http://127.0.0.1:8000/api/login",obj)
        .then(resp=>{
            var token = resp.data;
            var user = {userId: token.userid, type:token.type, access_token:token.token};
            localStorage.setItem('user',JSON.stringify(user));
            console.log(localStorage.getItem('user'));
            // navigate.push('/view_car_list');

            if(token.type=="Admin"){
                navigate.push('/admin_home');
            }
            else if(token.type=="Customer"){
                navigate.push('/customer_home');
            }
            else if(token.type=="Renter"){
                navigate.push('/renter_home');
            }
            
        }).catch(err=>{
            console.log(err);
        });


    }
    return(
        <div>
            <form>
                <br />
                Email: <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br />
                Password: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input><br />

            </form>
                <button onClick={loginSubmit}>Login</button>
        </div>

    )
}
export default Login; 