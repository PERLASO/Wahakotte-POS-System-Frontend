import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../style/forms.css'


class LoginForm extends Component {

    render() {
        return (
            <div className="FormPage justify-content-center">
                <div>
                    <div className="Form">
                        <h3 className="text-center pb-3">User Login</h3>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="username" placeholder="Enter Email here" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="username" placeholder="Enter Password here" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info w-100 mt-2">Login</button>
                            </div>
                            <div>
                                <p className="text-black mt-0">Account Verified? <Link to="/password-reset-account-verify">Click to Verifiy your account</Link></p>
                                <p className="text-black mt-0">Forgot password? <Link to="/password-reset">Click to Reset</Link></p>
                            </div>
                            <div className="secBreak mb-0">
                                <hr className="FormHr" />
                            </div>

                            <div>
                                <p className="text-black mt-0">New user?  <Link to="/registration">Click to Register</Link></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default LoginForm;