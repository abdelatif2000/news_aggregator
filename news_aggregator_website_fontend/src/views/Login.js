import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div className="main-wrapper">
      <div className="bg-pattern-style">
        <div className="content">
          <div className="account-content">
            <div className="account-box">
              <div className="login-right">
                <div className="login-header">
                  <h3>Login <span>Mentoring</span></h3>
                  <p className="text-muted">Access to your account</p>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    {message &&
                      <div className="alert bg-danger text-white">
                        <p>{message}</p>
                      </div>
                    }
                    <label className="form-control-label">Email Address</label>
                    <input ref={emailRef} type="email" placeholder="Email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Password</label>
                    <div className="pass-group">
                      <input ref={passwordRef} type="password" placeholder="Password" className="form-control pass-input" />
                      <span className="fas fa-eye toggle-password"></span>
                    </div>
                  </div>
                  <button className="btn btn-primary login-btn" type="submit">Login</button>
                  <div className="text-center dont-have">Not registered? <Link to="/signup">Create an account</Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}