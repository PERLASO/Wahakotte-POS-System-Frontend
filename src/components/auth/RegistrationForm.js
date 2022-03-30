import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../style/forms.css'


class RegistrationForm extends Component {

    render() {
        return (
            <div className="center">
                <div className="FormPage justify-content-center">
                    <div>
                        <div className="Form">
                        <h3 className="text-center pb-3">User Registration</h3>
                        <form className="">
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="First Name"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Last Name"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="username" placeholder="Password"/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">I agree all terms & conditions</label>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info w-100 mt-2">Create Account</button>
                    </div>
                    <div>
                        <p>Already user? <Link to="/login">Click to Login</Link></p>
                    </div>
                </form>
                        </div>

                    </div>
            </div>

            </div>
                

        )
    }
}

export default RegistrationForm;