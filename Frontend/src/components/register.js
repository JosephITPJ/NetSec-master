import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const RegisterForm = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        address: "",
        successful: false,
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setState(prevState => ({
            ...prevState,
            message: "",
            successful: false
        }));

        AuthService.register(state.username, state.email, state.password, state.firstName, state.lastName, state.dateOfBirth, state.phoneNumber, state.address)
            .then(response => {
                setState(prevState => ({
                    ...prevState,
                    message: response.data.message,
                    successful: true
                }));
            })
            .catch(error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setState(prevState => ({
                    ...prevState,
                    successful: false,
                    message: resMessage
                }));
            });
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <Form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input type="text" className="form-control" name="username" value={state.username} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input type="text" className="form-control" name="email" value={state.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password" value={state.password} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Input type="text" className="form-control" name="firstName" value={state.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Input type="text" className="form-control" name="lastName" value={state.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <Input type="date" className="form-control" name="dateOfBirth" value={state.dateOfBirth} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Input type="text" className="form-control" name="phoneNumber" value={state.phoneNumber} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Input type="text" className="form-control" name="address" value={state.address} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                    {state.message && (
                        <div className="form-group">
                            <div className={state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} />
                </Form>
            </div>
        </div>
    );
}

export default RegisterForm;
