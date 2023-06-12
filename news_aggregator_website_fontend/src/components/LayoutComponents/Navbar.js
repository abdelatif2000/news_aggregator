import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider';

export default function Navbar() {
    const { setUser, setToken } = useStateContext();
    const [isOpen, setisOpen] = useState(false);
    const onLogout = ev => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    return (
        <header className="header">
            <div className="header-fixed">
                <nav className="navbar navbar-expand-lg header-nav">
                    <div className="navbar-header">
                        <a id="mobile_btn" href="#">
                            <span className="bar-icon" onClick={() => setisOpen(!isOpen)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </a>
                        <a className="navbar-brand logo">
                            <Link to={'/'}>
                                <img src={require('../../assets/img/logo.png')} width={70} className=" logo-style" alt="Logo" />
                            </Link>
                        </a>
                    </div>
                    <ul className="main-nav" style={{ display: isOpen ? 'block' : 'none' }} >
                        <li className="login-link">
                            <a href="#" className='nav-link'><Link to="/preference" style={{ color: 'white' }} >Preference</Link></a>
                        </li>
                        <li className="login-link" style={{backgroundColor:'#7979e3'}}>
                            <a href="#" className='nav-link' onClick={onLogout}>Logout</a>
                        </li>
                    </ul>
                    <div className="main-menu-wrapper">
                        <div className="menu-header">
                            <a href="index-2.html" className="menu-logo">
                                logo
                            </a>
                            <a id="menu_close" className="menu-close" href="#">
                                <i className="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <ul className="nav header-navbar-rht">
                        <li className="nav-item">
                            <Link to="/preference" >Preference</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link header-login" style={{ cursor: 'pointer' }} onClick={onLogout}  >Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
