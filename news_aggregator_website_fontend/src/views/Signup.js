import { Link} from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                console.log(data);
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="main-wrapper">

            <div className="bg-pattern-style bg-pattern-style-register">
                <div className="content">

                    <div className="account-content">
                        <div className="account-box">
                            <div className="login-right">
                                <div className="login-header">
                                    <h3><span>Mentoring</span> Register</h3>
                                    <p className="text-muted">Signup for Free</p>
                                </div>
                                <form onSubmit={onSubmit}>
                                    {errors &&
                                        <div className="alert  bg-danger text-white">
                                            {Object.keys(errors).map(key => (
                                                <p key={key}>{errors[key][0]}</p>
                                            ))}
                                        </div>
                                    }
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label">Full Name</label>
                                                <input ref={nameRef} type="text" placeholder="Full Name" className="form-control" autofocus />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Email Address</label>
                                        <input ref={emailRef} type="email" placeholder="Email Address" className="form-control" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Password</label>
                                                <input ref={passwordRef} type="password" placeholder="Password" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Confirm Password</label>
                                                <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" className="form-control" name="password_confirmation" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary login-btn" type="submit">Create Account</button>
                                    <div className="account-footer text-center mt-3 dont-have">
                                        Already registered? <Link to="/login">Sign In</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    )
}