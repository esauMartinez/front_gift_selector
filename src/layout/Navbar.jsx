import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authAction"

const Navbar = () => {

    const { isNavbarHidden } = useSelector(state => state.gift)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    return (
        <Fragment>
            {
                isNavbarHidden ? '' : (
                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">GIFT SELECTOR</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarColor02">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={ 'admin' }>
                                            Administrador
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={ 'selector' }>Seleccionador</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a  className="nav-link" href="#" onClick={ () => dispatch(logout(navigate)) }>salir</a>
                                        {/* <Link className="nav-link" to={ '/login' }>Salir</Link> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )
            }            
        </Fragment>
    )
}

export default Navbar