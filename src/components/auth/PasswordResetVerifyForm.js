import React, {Component} from "react";
import { Link } from "react-router-dom";
import '../../style/forms.css'


class PasswordResetVerifyForm extends Component{

    render(){
        return (
            <div className="FormPage justify-content-center">
                <form className="Form">
                    <div className="form-group">
                        <h3 className="text-center pb-3">Account Verify</h3>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Email Here"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info w-100 mt-2">Login</button>
                    </div>
                    <div className="secBreak mb-0">
                <hr className="FormHr" />
              </div>
                    <div>
                        <p>Back to Login. <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default PasswordResetVerifyForm;