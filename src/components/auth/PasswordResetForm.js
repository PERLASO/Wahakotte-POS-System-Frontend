import React, { useState, useEffect} from "react";
import { useHistory,  Link } from "react-router-dom";
import { setGlobalState } from "../../GlobalState";



export default function PasswordResetForm() {

    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, seterror] = useState('');

    const history = useHistory();

    useEffect(() => {
        //password doesn't match error handle
        if (!(newPassword === "" || confirmPassword === "") && newPassword !== confirmPassword)
            seterror("Password doesn`t match");
        else seterror("");
    }, [newPassword, confirmPassword]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        handleChange();
         history.push({
             pathname: '/login',
         });             
    }

    const handleChange = () => {
        setGlobalState('password', newPassword)
    }

    return (
        <div className="FormPage justify-content-center">
            <form className="Form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <h3 className="text-center  justify-content-center pb-3">Password Reset</h3>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" onChange={(e) => {setnewPassword(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" onChange={(e) => {setconfirmPassword(e.target.value)}} />
                </div>
                <div className="form-group">
                    <button className="btn btn-info w-100 mt-2">Reset Password</button>
                </div>
                <div className=" alert-danger">{error}</div>
                <div className="secBreak mb-0">
                    <hr className="FormHr" />
                </div>
                <div>
                    <p>Back to Login. <Link to="/login" >Login</Link></p>
                </div>
            </form>
        </div>
    )
}


