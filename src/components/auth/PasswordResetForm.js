import React, { useState, useEffect} from "react";
import { useHistory,  Link } from "react-router-dom";
import { updatePassword, login } from "../../context/User";

export default function PasswordResetForm() {

    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('')
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
        seterror('')
        e.preventDefault();
        let data = { userName, password}
       login(data).then(res => {
         if(!res.data){
            seterror("User Name or Password is incorrect")
         }else{
            updatePassword({userName,password,newPassword}).then(c =>{
                if(c.data){
                    history.push("/login");
                   }else{
                        window.alert('Password Not updated')
                }
            })

         }
        })
}

    return (
        <div className="FormPage justify-content-center">
            <form className="Form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <h3 className="text-center  justify-content-center pb-3">Password Reset</h3>
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" onChange={(e) => {setuserName(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label>Old Password</label>
                    <input type="password" className="form-control" onChange={(e) => {setpassword(e.target.value)}}/>
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


