 import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useGlobalState } from "../../GlobalState";
import '../../style/forms.css'


export default function LoginForm(props) {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    let username = useGlobalState('username')[0];
    let pass = useGlobalState('password')[0];
  
    const history = useHistory();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name ==username && password==pass){
            history.push("/app");
        }else{
            seterror("User Name or Password is incorrect")
        }
    }

  return (
        <div className="FormPage justify-content-center">
            <div>
                <div className="Form">
                    <h3 className="text-center pb-3">User Login</h3>
                    <form onSubmit={(e) => {handleSubmit(e);}} >
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" placeholder="Enter User Name here"  onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" placeholder="Enter Password here" onChange={(e)=> setpassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-info w-100 mt-2">Login</button>
                        </div>
                        <div className=" alert-danger">{error}</div>
                        <div className="secBreak mb-0">
                            <hr className="FormHr" />
                        </div>
                        <div>
                            <p className="text-black mt-0">Forgot password? <Link to="/password-reset">Click to Reset</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
  )
}
