import React, { useEffect } from 'react'
import './Login.scss'
import LogoTsmConnect from '../../assets/Logo.png'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { authUser } from "../../features/auth/authAction"
import { Navigate } from "react-router-dom"

const Login = () => {

    const dispatch = useDispatch()
    const { isUserAuthenticated, permissions, roles, errorUser } = useSelector(state => state.auth)
    const { register, handleSubmit, setFocus } = useForm({
        defaultValues: {
            username: 'martinez117esau@gmail.com',
            password: 'mace930111'
        },
        shouldUseNativeValidation: true
    })

    useEffect(() => {
        setFocus('username', { shouldSelect: true })
    }, [setFocus, isUserAuthenticated])


    const onSubmit = (data) => {
        dispatch(authUser(data))
    }

    if (isUserAuthenticated && permissions.includes('ADMIN') && roles.includes('ADMIN')) {
        return <Navigate to={ '/admin' } />
    }

    if (isUserAuthenticated && permissions.includes('SELECTOR')) {
        return <Navigate to={ '/selector' } />
    }

    return (
        <div className="div-login">
            <div className="card">
                <div className="card-body">
                    <div 
                        className="d-flex justify-content-center align-items-center"
                    >
                        <img 
                            src={ LogoTsmConnect } 
                            alt="logo tsm connect" 
                            className="logo mb-5"
                        />
                    </div>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Usuario" 
                            name="username"
                            { ...register('username') }
                            required 
                        />
                        <input 
                            type="password" 
                            className="form-control mt-3" 
                            placeholder="Contraseña" 
                            { ...register('password') }
                            required
                        />
                        {
                            errorUser ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    Error, el usuario no existe
                                </div>
                            ) : ''
                        }
                        <div 
                            className="d-flex justify-content-end"
                        >
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-3"
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login